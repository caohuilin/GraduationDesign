package handler

import (
	"crypto/sha1"
	"encoding/hex"
	proto "git.oschina.net/wkc/book-server-v2/proto/v1"
	"github.com/dgrijalva/jwt-go"
	gerrors "github.com/micro/go-micro/errors"
	"github.com/pkg/errors"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"hash/fnv"
	"math/rand"
	"time"
)

func encodeImgURL(url string) string {
	s := sha1.New()
	s.Write([]byte(url))
	return "http://onq9kr1hy.bkt.clouddn.com/" + hex.EncodeToString(s.Sum(nil))
}

type UserClaims struct {
	Account string `json:"account"`
	jwt.StandardClaims
}

func jwtToken(secret string, account string) (signedToken string, err error) {
	expireToken := time.Now().Add(time.Hour * 24).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, UserClaims{
		Account: account,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    "book-service.hi-hi.cn",
		},
	})
	signedToken, err = token.SignedString([]byte(secret))
	return signedToken, err
}

func validJwt(secret string, signedToken string) (account string, err error) {
	token, err := jwt.ParseWithClaims(signedToken, &UserClaims{}, func(*jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil {
		return "", errors.Wrap(err, "bad jwt")
	}
	account = token.Claims.(*UserClaims).Account
	return account, nil
}

func (s *BookService) validUser(user *proto.User) (account string, err error) {
	if user == nil {
		return account, gerrors.BadRequest(SERVICE_ID, "no authed")
	}
	if user.Jwt != "" {
		account, err = validJwt(s.cfg.JwtToken, user.Jwt)
	}
	if err != nil {
		return account, gerrors.BadRequest(SERVICE_ID, errors.Wrap(err, "bad token").Error())
	}
	var u dUser
	if user.Account != "" && account != "" {
		return account, gerrors.BadRequest(SERVICE_ID, "one of jwt and account")
	}
	if user.Account != "" {
		account = user.Account
	}
	err = s.duser.Find(bson.M{"account": account}).One(&u)
	if err == mgo.ErrNotFound {
		return account, gerrors.Unauthorized(SERVICE_ID, ErrUserNotFound)
	}
	if err != nil {
		return account, errors.Wrap(err, ErrDB)
	}
	return account, nil
}

func shuffle(a []int, r *rand.Rand) {
	for i := range a {
		j := r.Intn(i + 1)
		a[i], a[j] = a[j], a[i]
	}
}

func shuffleBook(b []*dBook, identify string) (c []*dBook) {
	f := fnv.New32()
	f.Write([]byte(identify))
	r := rand.New(rand.NewSource(int64(f.Sum32())))
	l := len(b)
	a := make([]int, l)
	for i := 0; i < l; i++ {
		a[i] = i
	}
	shuffle(a, r)
	c = make([]*dBook, l)
	for i := 0; i < l; i++ {
		c[i] = b[a[i]]
	}
	return c
}

func jsonTime(t time.Time) string {
	return t.Format(time.RFC3339Nano)
}
