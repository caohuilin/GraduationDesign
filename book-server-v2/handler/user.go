package handler

import (
	"encoding/base64"
	"fmt"
	proto "git.oschina.net/wkc/book-server-v2/proto/v1"
	gerrors "github.com/micro/go-micro/errors"
	"github.com/pborman/uuid"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/net/context"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"strconv"
	"time"
)

func (s *BookService) Register(ctx context.Context, req *proto.RegisterRequest, rsp *proto.RegisterResponse) error {
	account := req.Account
	nickname := req.Nickname
	password := req.Password
	if account == "" {
		return gerrors.BadRequest(SERVICE_ID, "account should not empty")
	}
	if nickname == "" {
		return gerrors.BadRequest(SERVICE_ID, "nickname should not empty")
	}
	if password == "" {
		return gerrors.BadRequest(SERVICE_ID, "password should not empty")
	}
	n, err := s.duser.Find(bson.M{"account": account}).Count()
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	if n > 0 {
		return gerrors.BadRequest(SERVICE_ID, ErrUserExists)
	}
	salt := uuid.New()
	h, err := bcrypt.GenerateFromPassword([]byte(salt+password), 10)
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	pp := base64.StdEncoding.EncodeToString(h)
	user := dUser{
		Account:  account,
		Nickname: nickname,
		Salt:     salt,
		Password: pp,
		Created:  time.Now(),
		Updated:  time.Now(),
	}
	err = s.duser.Insert(user)
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	rsp.Jwt, err = jwtToken(s.cfg.JwtToken, account)
	if err != nil {
		return errors.WithStack(err)
	}
	return nil
}

func (s *BookService) Login(ctx context.Context, req *proto.LoginRequest, rsp *proto.LoginResponse) error {
	account := req.Account
	password := req.Password
	var user dUser
	err := s.duser.Find(bson.M{"account": account}).One(&user)
	if mgo.ErrNotFound == err {
		return gerrors.Unauthorized(SERVICE_ID, ErrUserNotFound)
	}
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	hashPassword, _ := base64.StdEncoding.DecodeString(user.Password)
	err = bcrypt.CompareHashAndPassword(hashPassword, []byte(user.Salt+password))
	if err != nil {
		return gerrors.Unauthorized(SERVICE_ID, ErrBadPassword)
	}
	rsp.Jwt, err = jwtToken(s.cfg.JwtToken, account)
	if err != nil {
		return errors.WithStack(err)
	}
	return nil
}

func (s *BookService) GetUserInfo(ctx context.Context, req *proto.GetUserInfoRequest, rsp *proto.GetUserInfoResponse) error {
	account, err := s.validUser(req.User)
	if err != nil {
		return err
	}
	rsp.Username = account
	var user dUser
	err = s.duser.Find(bson.M{"account": account}).One(&user)
	if err != nil {
		return errors.WithStack(err)
	}
	rsp.Nickname = user.Nickname
	{
		var r dHistory
		err = s.dhistory.Find(bson.M{"account": account}).Sort("-created").One(&r)
		switch err {
		case mgo.ErrNotFound:
		case nil:
			rsp.Current = &proto.GetUserInfoResponse_Current{
				BookId:     r.BookID,
				MenuId:     r.MenuID,
				Page:       r.Page,
				HasHistory: true,
				LastTime:   jsonTime(r.Created),
			}
		default:
			return errors.Wrap(err, ErrDB)
		}
	}
	return nil
}

func (s *BookService) CollectBook(ctx context.Context, req *proto.CollectBookRequest, rsp *proto.CollectBookResponse) error {
	account, err := s.validUser(req.User)
	if err != nil {
		return err
	}
	if req.BookId == 0 {
		return gerrors.BadRequest(SERVICE_ID, "book_id should not empty")
	}
	if req.Tag == "" {
		req.Tag = "default"
	}
	n, err := s.dbook.Find(bson.M{"id": req.BookId}).Count()
	if err != nil {
		return errors.WithStack(err)
	}
	if n == 0 {
		return gerrors.BadRequest(SERVICE_ID, "book not found")
	}
	var col dCollect
	err = s.dcollect.Find(bson.M{"account": account}).One(&col)
	if err != nil && err != mgo.ErrNotFound {
		return errors.WithStack(err)
	}
	if err == mgo.ErrNotFound {
		col.Account = account
	}
	switch req.Action {
	case "add":
		found := false
		for i, v := range col.Collect {
			if v.BookID == int(req.BookId) {
				col.Collect[i].Tag = req.Tag
				found = true
				break
			}
		}
		if !found {
			col.Collect = append(col.Collect, collect{int(req.BookId), req.Tag})
		}
	case "delete":
		collects := make([]collect, 0)
		for _, v := range col.Collect {
			if v.BookID != int(req.BookId) {
				collects = append(collects, v)
			}
		}
		col.Collect = collects
	default:
		return gerrors.BadRequest(SERVICE_ID, "action should add or delete")
	}
	_, err = s.dcollect.Upsert(bson.M{"account": account}, col)
	if err != nil {
		return errors.WithStack(err)
	}
	return nil
}

func (s *BookService) GetCollectedBook(ctx context.Context, req *proto.GetCollectedBookRequest, rsp *proto.GetCollectedBookResponse) error {
	account, err := s.validUser(req.User)
	if err != nil {
		return err
	}
	var col dCollect
	err = s.dcollect.Find(bson.M{"account": account}).One(&col)
	if err == mgo.ErrNotFound {
		rsp.Books = make([]*proto.Book, 0)
		rsp.Tag = make([]*proto.GetCollectedBookResponse_Tag, 0)
		return nil
	}
	if err != nil {
		return errors.WithStack(err)
	}
	books := make([]int, 0)
	for _, v := range col.Collect {
		rsp.Tag = append(rsp.Tag, &proto.GetCollectedBookResponse_Tag{
			BookId: strconv.Itoa(v.BookID),
			Tag:    v.Tag,
		})
		books = append(books, v.BookID)
	}
	var r []dBook
	err = s.dbook.Find(bson.M{"id": bson.M{"$in": books}}).All(&r)
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	for _, v := range r {
		rsp.Books = append(rsp.Books, &proto.Book{
			Id:          strconv.Itoa(v.ID),
			Name:        v.Name,
			Picture:     encodeImgURL(v.Picture),
			Author:      v.Author,
			Description: v.Introduce,
			Category:    v.Category,
		})
	}
	return nil
}

func (s *BookService) SetUserReadStatus(ctx context.Context, req *proto.SetUserReadStatusRequest, rsp *proto.SetUserReadStatusResponse) error {
	account, err := s.validUser(req.User)
	if err != nil {
		return err
	}
	if req.BookId == 0 {
		return gerrors.BadRequest(SERVICE_ID, "book_id required")
	}
	d := dHistory{}
	d.Account = account
	d.BookID = req.BookId
	d.Created = time.Now()
	d.MenuID = req.MenuId
	d.Page = req.Page
	err = s.dhistory.Insert(d)
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	return nil
}

func (s *BookService) GetUserReadStatus(ctx context.Context, req *proto.GetUserReadStatusRequest, rsp *proto.GetUserReadStatusResponse) error {
	account, err := s.validUser(req.User)
	if err != nil {
		return err
	}
	var r dHistory
	err = s.dhistory.Find(bson.M{"account": account, "book_id": req.BookId}).Sort("-created").One(&r)
	if err == mgo.ErrNotFound {
		rsp.HasHistory = false
		return nil
	}
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	rsp.HasHistory = true
	rsp.BookId = r.BookID
	rsp.MenuId = r.MenuID
	rsp.Page = r.Page
	rsp.LastTime = jsonTime(r.Created)
	return nil
}

func (s *BookService) GetUserRecommendBook(ctx context.Context, req *proto.GetUserRecommendBookRequest, rsp *proto.GetUserRecommendBookResponse) error {
	account, err := s.validUser(req.User)
	if err != nil {
		return err
	}
	var r []*dBook
	err = s.dbook.Find(bson.M{}).Select(bson.M{"catalogue": false}).All(&r)
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	year, month, day := time.Now().Date()
	identify := fmt.Sprintf("%s-%d-%d-%d", account, year, month, day)
	r2 := shuffleBook(r, identify)
	for _, v := range r2 {
		rsp.Books = append(rsp.Books, &proto.Book{
			Id:          strconv.Itoa(v.ID),
			Name:        v.Name,
			Picture:     encodeImgURL(v.Picture),
			Author:      v.Author,
			Description: v.Introduce,
			Category:    v.Category,
		})
	}
	return nil
}
