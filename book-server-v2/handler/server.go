package handler

import (
	"github.com/pkg/errors"
	"gopkg.in/mgo.v2"
)

type BookService struct {
	dbook    *mgo.Collection
	dtag     *mgo.Collection
	dpage    *mgo.Collection
	duser    *mgo.Collection
	dcollect *mgo.Collection
	dhistory *mgo.Collection
	cfg      Config
}

type Config struct {
	MgoURL       string
	DatabaseName string
	JwtToken     string
}

func New(cfg Config) (b *BookService, err error) {
	b = new(BookService)
	session, err := mgo.Dial(cfg.MgoURL)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	d := session.DB(cfg.DatabaseName)
	b.dbook = d.C("book")
	b.dtag = d.C("tag")
	b.dpage = d.C("page")
	b.duser = d.C("user")
	b.dcollect = d.C("collect")
	b.dhistory = d.C("history")
	b.cfg = cfg
	return b, nil
}
