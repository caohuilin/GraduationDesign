package handler

import (
	proto "git.oschina.net/wkc/book-server-v2/proto/v1"
	gerrors "github.com/micro/go-micro/errors"
	"github.com/pkg/errors"
	"golang.org/x/net/context"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"sort"
	"strconv"
	"strings"
)

func (s *BookService) GetTags(ctx context.Context, req *proto.GetTagsRequest, rsp *proto.GetTagsResponse) error {
	var r []dTag
	err := s.dtag.Find(bson.M{}).All(&r)
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	for _, v := range r {
		rsp.Tags = append(rsp.Tags, &proto.GetTagsResponse_Tag{
			Id:       strconv.Itoa(v.ID),
			Category: v.Category,
			BooksCnt: v.BooksCnt,
		})
	}
	return nil
}

func (s *BookService) GetTagById(ctx context.Context, req *proto.GetTagByIdRequest, rsp *proto.GetTagByIdResponse) error {
	id, _ := strconv.Atoi(req.Id)
	var r []dBook
	err := s.dbook.Find(bson.M{
		"tag_id": id,
	}).All(&r)
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

func (s *BookService) GetBookById(ctx context.Context, req *proto.GetBookByIdRequest, rsp *proto.GetBookByIdResponse) error {
	id, _ := strconv.Atoi(req.BookId)
	var r dBook
	err := s.dbook.Find(bson.M{
		"id": id,
	}).One(&r)
	if err == mgo.ErrNotFound {
		return gerrors.BadRequest(SERVICE_ID, "tag not found")
	}
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	rsp.Id = strconv.Itoa(r.ID)
	rsp.Name = r.Name
	rsp.Picture = encodeImgURL(r.Picture)
	rsp.Author = r.Author
	rsp.Description = r.Introduce
	rsp.Category = r.Category

	for _, v := range r.Catalogue {
		if !v.Exists {
			continue
		}
		rsp.Catalog = append(rsp.Catalog, &proto.GetBookByIdResponse_Catalog{
			Id:      v.ID,
			Chapter: v.Chapter,
		})
	}
	return nil
}
func (s *BookService) GetBookContent(ctx context.Context, req *proto.GetBookContentRequest, rsp *proto.GetBookContentResponse) error {
	bid, _ := strconv.Atoi(req.BookId)
	cid, _ := strconv.Atoi(req.MeauId)
	n, err := s.dbook.Find(bson.M{
		"id": bid,
	}).Count()
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	if n == 0 {
		return gerrors.NotFound(SERVICE_ID, "book not found")
	}
	var r dPage
	err = s.dpage.Find(bson.M{
		"bid": bid,
		"cid": cid,
	}).One(&r)
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	rsp.Contents = r.Text
	return nil
}

func (s *BookService) SearchBook(ctx context.Context, req *proto.SearchBookRequest, rsp *proto.SearchBookResponse) error {
	keyword := req.Keyword
	type book struct {
		dBook
		scope int
	}
	var r []dBook
	err := s.dbook.Find(bson.M{}).Select(bson.M{"catalogue": false}).All(&r)
	if err != nil {
		return errors.Wrap(err, ErrDB)
	}
	matchScope := func(b dBook) int {
		if strings.Contains(b.Author, keyword) {
			return 100
		}
		if strings.Contains(b.Name, keyword) {
			return 200
		}
		if strings.Contains(b.Introduce, keyword) {
			return 50
		}
		if strings.Contains(b.Category, keyword) {
			return 80
		}
		return 0
	}
	var r2 []book
	for _, v := range r {
		scope := matchScope(v)
		if scope == 0 {
			continue
		}
		r2 = append(r2, book{dBook: v, scope: scope})
	}

	sort.Slice(r2, func(i, j int) bool {
		return r2[i].scope > r2[j].scope
	})

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
