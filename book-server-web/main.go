package main

import (
	proto "git.oschina.net/wkc/book-server-v2/proto/v1"
	"git.oschina.net/wkc/book-server-web/handler"
	"github.com/emicklei/go-restful"
	"github.com/micro/go-micro/client"
	"github.com/micro/go-web"
	"log"
	"net/http"
)

func enableCORS(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
	if origin := req.Request.Header.Get("Origin"); origin != "" {
		resp.AddHeader("Access-Control-Allow-Origin", origin)
		resp.AddHeader("Access-Control-Allow-Headers", "Content-type, Authorization")
		resp.AddHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
	}
	chain.ProcessFilter(req, resp)
}

func main() {
	service := web.NewService(web.Name("go.micro.web.book-server-v2"))

	wc := restful.NewContainer()

	ws := new(restful.WebService).Path("/v2").Consumes(restful.MIME_JSON).Produces(restful.MIME_JSON)
	ws.Route(ws.GET("/tags").To(handler.GetTags))
	ws.Route(ws.GET("/tags/{id}").To(handler.GetTagById))
	ws.Route(ws.GET("/books/{bookId}").To(handler.GetBookById))
	ws.Route(ws.GET("/books/{bookId}/content/{meauId}").To(handler.GetBookContent))
	ws.Route(ws.GET("/search/books").To(handler.SearchBook))
	ws.Route(ws.POST("/register").To(handler.Register))
	ws.Route(ws.POST("/login").To(handler.Login))
	ws.Route(ws.GET("/user/info").Filter(handler.JwtAuthenticate).To(handler.GetUserInfo))
	ws.Route(ws.POST("/user/collect").Filter(handler.JwtAuthenticate).To(handler.CollectBook))
	ws.Route(ws.GET("/user/collect").Filter(handler.JwtAuthenticate).To(handler.GetCollectedBook))
	ws.Route(ws.POST("/user/status").Filter(handler.JwtAuthenticate).To(handler.SetUserReadStatus))
	ws.Route(ws.GET("/user/status/{bookId}").Filter(handler.JwtAuthenticate).To(handler.GetUserReadStatus))
	ws.Route(ws.GET("/user/recommend").Filter(handler.JwtAuthenticate).To(handler.GetUserRecommendBook))

	wc.Filter(enableCORS)
	wc.Filter(wc.OPTIONSFilter)
	wc.Add(ws)
	service.Handle("/docs/", http.StripPrefix("/docs/", http.FileServer(assetFS())))
	service.Handle("/v2/", wc)
	service.Handle("/", http.RedirectHandler("/docs/", 302))
	service.Init()

	handler.Client = proto.NewBookServiceClient("go.micro.srv.book-server-v2", client.DefaultClient)
	err := service.Run()
	if err != nil {
		log.Panicln(err)
	}
}
