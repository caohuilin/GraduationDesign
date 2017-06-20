import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as api from '../middleware/api';

function* loginRequest(actions: any) {
    try {
        const res = yield call(api.login, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'login success', payload: res });
        } else {
            yield put({ type: 'login failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'login failed', error: error });
    }
};

function* registerRequest(actions: any) {
    try {
        const res = yield call(api.register, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'register success', payload: res });
        } else {
            yield put({ type: 'register failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'register failed', error: error });
    }
};

function* getUserInfo(actions: any) {
    try {
        const res = yield call(api.getUserInfo, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get user info success', payload: res });
        } else {
            yield put({ type: 'get user info failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'get user info failed', error: error });
    }
};

function* saveUserStatus(actions: any) {
    try {
        const res = yield call(api.saveUserStatus, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'save user status success', payload: res });
        } else {
            yield put({ type: 'save user status failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'save user status failed', error: error });
    }
};

function* getUserStatus(actions: any) {
    try {
        const res = yield call(api.getUserStatus, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get user status success', payload: res });
        } else {
            yield put({ type: 'get user status failed', error: res.error });
        }
    } catch (error) {
        yield put({ type: 'get user status failed', error: error });
    }
};

export default function* () {
    yield fork(takeLatest, 'login request', loginRequest);
    yield fork(takeLatest, 'register request', registerRequest);
    yield fork(takeLatest, 'get user info', getUserInfo);
    yield fork(takeLatest, 'save user status', saveUserStatus);
    yield fork(takeLatest, 'get user status', getUserStatus);
}
