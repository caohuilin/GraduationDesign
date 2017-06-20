import { fork } from 'redux-saga/effects';
import home from './home';
import auth from './auth';
import collect from './collect';

export default function* root(): void {
    yield fork(home);
    yield fork(auth);
    yield fork(collect);
}
