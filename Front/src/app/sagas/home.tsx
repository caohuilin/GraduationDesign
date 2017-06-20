import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as api from '../middleware/api';

function* getCategortyList(actions: any) {
    try {
        const res = yield call(api.getCategoryList, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get category list success', payload: res });
        } else {
            yield put({ type: 'get category list failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'get category list failed', error: error });
    }
};

function* getCategoryBookList(actions: any) {
    try {
        const res = yield call(api.getCategoryBookList, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get category books list success', payload: res });
        } else {
            yield put({ type: 'get category books list failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'get category books list failed', error: error });
    }
};

function* getBookInfo(actions: any) {
    try {
        const res = yield call(api.getBookInfo, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get book info success', payload: res });
        } else {
            yield put({ type: 'get book info failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'get book info failed', error: error });
    }
};

function* getContent(actions: any) {
    try {
        const res = yield call(api.getContent, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get content success', payload: res });
        } else {
            yield put({ type: 'get content failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'get content failed', error: error });
    }
};

function* searchBooks(actions: any) {
    try {
        const res = yield call(api.searchBooks, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'search books success', payload: res });
        } else {
            yield put({ type: 'search books failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'search books failed', error: error });
    }
};

export default function* () {
    yield fork(takeLatest, 'get category list', getCategortyList);
    yield fork(takeLatest, 'get category books list', getCategoryBookList);
    yield fork(takeLatest, 'get book info', getBookInfo);
    yield fork(takeLatest, 'get content', getContent);
    yield fork(takeLatest, 'search books', searchBooks);
}
