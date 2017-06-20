import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as api from '../middleware/api';

function* collectBook(actions: any) {
    try {
        const res = yield call(api.collectBook, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get collect books' });
            yield put({ type: 'collect book success', payload: res });
        } else {
            yield put({ type: 'collect book failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'collect book failed', error: error });
    }
};

function* getCollectBooks(actions: any) {
    try {
        const res = yield call(api.getCollectBooks, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get collect books success', payload: res });
        } else {
            yield put({ type: 'get collect books failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'get collect books failed', error: error });
    }
};

function* getRecommendBooks(actions: any) {
    try {
        const res = yield call(api.getRecommendBooks, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get recommend books success', payload: res });
        } else {
            yield put({ type: 'get recommend books failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'get recommend books failed', error: error });
    }
};

export default function* () {
    yield fork(takeLatest, 'collect book', collectBook);
    yield fork(takeLatest, 'get collect books', getCollectBooks);
    yield fork(takeLatest, 'get recommend books', getRecommendBooks);
}
