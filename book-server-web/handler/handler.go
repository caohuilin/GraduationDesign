package handler

import (
	proto "git.oschina.net/wkc/book-server-v2/proto/v1"
	"github.com/emicklei/go-restful"
	"github.com/micro/go-micro/errors"
	"golang.org/x/net/context"
	"net/http"
	"strconv"
	"strings"
)

var Client proto.BookServiceClient

const SERVICE_ID = "go.micro.srv.book-server-web"

func writeRpcError(rsp *restful.Response, err error) {
	rsp.AddHeader(restful.HEADER_ContentType, restful.MIME_JSON)
	err2 := errors.Parse(err.Error())
	if err2.Code == 0 {
		err2.Code = http.StatusInternalServerError
	}
	if err2.Id == "" {
		err2.Id = SERVICE_ID
	}
	if err2.Status == "" {
		err2.Status = http.StatusText(http.StatusInternalServerError)
	}
	rsp.WriteError(int(err2.Code), err2)
	return
}

func GetTags(req *restful.Request, rsp *restful.Response) {
	in := proto.GetTagsRequest{}
	ctx := context.Background()
	resp, err := Client.GetTags(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func GetTagById(req *restful.Request, rsp *restful.Response) {
	id := req.PathParameter("id")
	in := proto.GetTagByIdRequest{Id: id}
	ctx := context.Background()
	resp, err := Client.GetTagById(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func GetBookById(req *restful.Request, rsp *restful.Response) {
	id := req.PathParameter("bookId")
	in := proto.GetBookByIdRequest{BookId: id}
	ctx := context.Background()
	resp, err := Client.GetBookById(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func GetBookContent(req *restful.Request, rsp *restful.Response) {
	bookId := req.PathParameter("bookId")
	menuId := req.PathParameter("meauId")
	in := proto.GetBookContentRequest{BookId: bookId, MeauId: menuId}
	ctx := context.Background()
	resp, err := Client.GetBookContent(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func SearchBook(req *restful.Request, rsp *restful.Response) {
	query := req.QueryParameter("q")
	in := proto.SearchBookRequest{Keyword: query}
	ctx := context.Background()
	resp, err := Client.SearchBook(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func Register(req *restful.Request, rsp *restful.Response) {
	in := proto.RegisterRequest{}
	err := req.ReadEntity(&in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	ctx := context.Background()
	resp, err := Client.Register(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func Login(req *restful.Request, rsp *restful.Response) {
	in := proto.LoginRequest{}
	err := req.ReadEntity(&in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	ctx := context.Background()
	resp, err := Client.Login(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func GetUserInfo(req *restful.Request, rsp *restful.Response) {
	in := proto.GetUserInfoRequest{}
	in.User = readToken(req)
	ctx := context.Background()
	resp, err := Client.GetUserInfo(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func CollectBook(req *restful.Request, rsp *restful.Response) {
	in := proto.CollectBookRequest{}
	if err := req.ReadEntity(&in); err != nil {
		writeRpcError(rsp, err)
		return
	}
	in.User = readToken(req)
	ctx := context.Background()
	resp, err := Client.CollectBook(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func GetCollectedBook(req *restful.Request, rsp *restful.Response) {
	in := proto.GetCollectedBookRequest{}
	in.User = readToken(req)
	ctx := context.Background()
	resp, err := Client.GetCollectedBook(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func SetUserReadStatus(req *restful.Request, rsp *restful.Response) {
	in := proto.SetUserReadStatusRequest{}
	if err := req.ReadEntity(&in); err != nil {
		writeRpcError(rsp, err)
		return
	}
	in.User = readToken(req)
	ctx := context.Background()
	resp, err := Client.SetUserReadStatus(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func GetUserReadStatus(req *restful.Request, rsp *restful.Response) {
	in := proto.GetUserReadStatusRequest{}
	in.User = readToken(req)

	BookID, _ := strconv.Atoi(req.PathParameter("bookId"))
	in.BookId = int32(BookID)
	ctx := context.Background()
	resp, err := Client.GetUserReadStatus(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func GetUserRecommendBook(req *restful.Request, rsp *restful.Response) {
	in := proto.GetUserRecommendBookRequest{}
	in.User = readToken(req)
	ctx := context.Background()
	resp, err := Client.GetUserRecommendBook(ctx, &in)
	if err != nil {
		writeRpcError(rsp, err)
		return
	}
	rsp.WriteEntity(resp)
}

func JwtAuthenticate(req *restful.Request, rsp *restful.Response, chain *restful.FilterChain) {
	h := req.Request.Header.Get("Authorization")
	if strings.HasPrefix(h, "Bearer ") {
		token := strings.TrimPrefix(h, "Bearer ")
		req.SetAttribute(attributetoken, token)
		chain.ProcessFilter(req, rsp)
		return
	}
	rsp.AddHeader("WWW-Authenticate", "Basic realm=Protected Area")
	writeRpcError(rsp, errors.Unauthorized(SERVICE_ID, "Not Authorized"))
	return
}

const attributetoken = "__token"

func readToken(req *restful.Request) *proto.User {
	r := req.Attribute(attributetoken)
	if v, ok := r.(string); ok {
		return &proto.User{Jwt: v}
	}
	panic("readToken error")
}
