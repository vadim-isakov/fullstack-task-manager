import produce from 'immer';
import { FETCH, SUCCESS, ERROR, CLEAR } from './constants';

export const initialState = {
  fetched: false,
  loading: false,
  errorMsg: false,
  request: false,
  response: false,
};

/* eslint-disable default-case, no-param-reassign */
const createReducer = stateKey => (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case `${stateKey}/${FETCH}`:
        draft.fetched = false;
        draft.loading = true;
        draft.errorMsg = false;
        draft.request = action.data;
        break;

      case `${stateKey}/${SUCCESS}`:
        draft.fetched = true;
        draft.loading = false;
        draft.errorMsg = false;
        draft.response = action.data;
        break;

      case `${stateKey}/${ERROR}`:
        draft.fetched = true;
        draft.loading = false;
        draft.errorMsg = action.errorMsg;
        draft.response = false;
        break;

      case `${stateKey}/${CLEAR}`:
        Object.keys(initialState).forEach(key => {
          draft[key] = initialState[key];
        });
        break;
    }
  });

export default createReducer;
