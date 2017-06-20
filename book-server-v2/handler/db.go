package handler

import (
	"time"
)

type dTag struct {
	Category string `bson:"category"`
	ID       int    `bson:"id"`
	BooksCnt int32  `bson:"books_cnt"`
}

type dBook struct {
	Author    string `bson:"author"`
	Catalogue []struct {
		Chapter string `bson:"chapter"`
		ID      string `bson:"id"`
		Exists  bool   `bson:"exists"`
	} `bson:"catalogue"`
	Category  string `bson:"category"`
	ID        int    `bson:"id"`
	Introduce string `bson:"introduce"`
	Name      string `bson:"name"`
	Picture   string `bson:"picture"`
	TagID     int    `bson:"tag_id"`
	View      int    `bson:"view"`
}

type dPage struct {
	Bid  int      `bson:"bid"`
	Body string   `bson:"body"`
	Cid  int      `bson:"cid"`
	Text []string `bson:"text"`
	URL  string   `bson:"url"`
}

type dUser struct {
	Account  string    `bson:"account"`
	Nickname string    `bson:"nickname"`
	Salt     string    `bson:"salt"`
	Password string    `bson:"password"`
	Created  time.Time `bson:"created"`
	Updated  time.Time `bson:"updated"`
}

type dCollect struct {
	Account string    `bson:"account"`
	Collect []collect `bson:"collect"`
}

type collect struct {
	BookID int    `bson:"book_id"`
	Tag    string `bson:"tag"`
}

type dHistory struct {
	Account string    `bson:"account"`
	Created time.Time `bson:"created"`
	BookID  int32     `bson:"book_id"`
	MenuID  int32     `bson:"menu_id"`
	Page    int32     `bson:"page"`
}
