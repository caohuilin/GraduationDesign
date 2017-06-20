package handler

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_encodeImgURL(t *testing.T) {
	type args struct {
		url string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{
			name: "",
			args: args{
				url: "http://book.img.ireader.com/group6/M00/13/C8/CmQUN1X04PWEXsd7AAAAALweKkk232886463.jpg?v=7zOoD3UL",
			},
			want: "http://onq9kr1hy.bkt.clouddn.com/5e0fc7e6ba8a675cbefc187a4bf7bf9760fb8eb5",
		},
	}
	for _, tt := range tests {
		if got := encodeImgURL(tt.args.url); got != tt.want {
			t.Errorf("%q. encodeImgURL() = %v, want %v", tt.name, got, tt.want)
		}
	}
}

func Test_jwtToken(t *testing.T) {
	assert := assert.New(t)
	token, err := jwtToken("asdsa", "wang")
	assert.Nil(err)
	account, err := validJwt("asdsa", token)
	assert.Nil(err)
	assert.Equal(account, "wang")
}

func Test_shuffleBook(t *testing.T) {
	assert := assert.New(t)
	d1 := []*dBook{
		&dBook{Name: "1"},
		&dBook{Name: "2"},
		&dBook{Name: "3"},
		&dBook{Name: "4"},
		&dBook{Name: "5"},
	}
	a := shuffleBook(d1, "123")
	b := shuffleBook(d1, "123")
	c := shuffleBook(d1, "1234")
	assert.EqualValues(a, b)
	assert.NotEqual(a[0].Name, c[0].Name)
}
