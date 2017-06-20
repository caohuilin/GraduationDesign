import * as Immutable from 'immutable';
import { IAllBookList, IBookInfo, IAllCategory, IContent, IRouter, IBright, IFont, IAuth, ISearchBookList, IAccount, ICollectBookList } from './ReducerType';

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
}

export interface IBookListProps {
    allbooklist: IAllBookList;
}

export interface IBookListState {
}

export interface ICategoryListProps {
    allbooklist: IAllBookList;
    allcategory: IAllCategory;
    HomeActions: any;
}
export interface ICategoryListState {
    id: string;
    showAll: boolean;
}

export interface IFooterProps {
    routing: IRouter;
}
export interface IFooterState {
}

export interface IHeaderProps {
    routing: IRouter;
    account: IAccount;
    AuthActions: any;
}
export interface IHeaderState {
}

export interface ISearchProps {
    HomeActions: any;
    search: ISearchBookList;
}
export interface ISearchState {
    search?: boolean;
    input?: boolean;
}

export interface IBookContentProps {
    everyWidth: number;
    page: number;
    content: Immutable.List<string>;
    bookInfo: IBookInfo;
    bookId: number;
    menuId: number;
    worked: boolean;
    setWorked: Function;
    actions: any;
}
export interface IBookContentState {
    currentPage?: number;
    offsetWrapLength?: number;
}

export interface IBookItemProps {
    content: Immutable.List<string>;
    i: number;
    x: number;
    y: number;
    bright: number;
    night: boolean;
    fontSize: number;
    actions: any;
}
export interface IBookItemState {
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IBatteryProps {
}

export interface IBatteryState {
    battery: number;
    charging: boolean;
}

export interface IBookContentFooterProps {
    fontSize: number;
    actions: any;
    show: boolean;
}

export interface IBookContentFooterState {
}

export interface IBookContentHeaderProps {
    bookId: string;
    show: boolean;
    setShareShow: any;
    CollectActions: any;
    collect: ICollectBookList;
}

export interface IBookContentHeaderState {
    collect: boolean;
}

export interface IBrightnessProps {
    bright: number;
    night: boolean;
    actions: any;
}

export interface IBrightnessState {
}

export interface IProgressBarProps {
    bright: number;
    actions: any;
}

export interface IProgressBarState {
}

export interface IShareProps {
    showShare: boolean;
}

export interface IShareState {
}
