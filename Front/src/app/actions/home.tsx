import { createAction } from 'redux-actions';

export const getCategortyList = createAction('get category list');
export const getCategoryBookList = createAction('get category books list');
export const ClearBookList = createAction('clear books list');
export const getBookInfo = createAction('get book info');
export const getContent = createAction('get content');
export const searchBooks = createAction('search books');
