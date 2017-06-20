import { handleActions } from 'redux-actions';
import { List } from 'immutable';

import { IRecommendBookList } from '../constants/ReducerType';

const initialState = new(IRecommendBookList);

export default handleActions({
  'get recommend books success' (state: IRecommendBookList = initialState, action: any) {
    return state.update ('list', v => List(action.payload.books.slice(0, 9)));
  },
}, initialState);
