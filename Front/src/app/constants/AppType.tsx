import { IAllBookList, IBookInfo, IAllCategory, IContent, IBright, IFont, IRouter, IAuth, ISearchBookList, IAccount, ICollectBookList, IRecommendBookList, IUserStatus } from './ReducerType';

export interface IAllState {
    allbooklist: IAllBookList;
    allcategory: IAllCategory;
    bookinfo: IBookInfo;
    content: IContent;
    bright: IBright;
    routing: IRouter;
    font: IFont;
    auth: IAuth;
    search: ISearchBookList;
    account: IAccount;
    collect: ICollectBookList;
    recommend: IRecommendBookList;
    userstatus: IUserStatus;
}

export interface IAppProps {
  children: object;
  actions: any;
}

export interface IAppState {
}

export interface IHomeProps {
  allbooklist: IAllBookList;
  id: string;
  account: IAccount;
  HomeActions: any;
}

export interface IHomeState {
    showRemind: boolean;
}

export interface IContentProps {
    bookId: string;
    menuId: string;
    HomeActions: any;
}

export interface IContentState {
    showHeaderAndFooter?: boolean;
    showShare?: boolean;
}

export interface IArticleProps {
    bookinfo: IBookInfo;
    id: string;
    userstatus: IUserStatus;
    actions: any;
}
export interface IArticleState {
    showAll?: boolean;
    showRemind?: boolean;
}

export interface IUserPrsops {
    account: IAccount;
}

export interface IUserState {
}

export interface ICollectionProps {
    collect: ICollectBookList;
    account: IAccount;
    recommend: IRecommendBookList;
    CollectActions: any;
}

export interface ICollectionState {
}
