import produce from 'immer';
import { createSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';

const KEY = 'Message';

// Actions
const SET = `${KEY}/SET`;
const CLEAR = `${KEY}/CLEAR`;

const initialState = {
  message: false,
  type: false,
};

// Reducer
/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET:
        draft.message = action.message;
        draft.type = action.msgType;
        break;
      case CLEAR:
        draft.message = false;
        draft.type = false;
        break;
    }
  });

// Action Creators
function set(message, msgType) {
  return { type: SET, message, msgType };
}

function clear() {
  return { type: CLEAR };
}

// Selectors
const selectState = state => state[KEY] || initialState;

const makeSelectMessage = () =>
  createSelector(
    selectState,
    state => state.message,
  );

const makeSelectType = () =>
  createSelector(
    selectState,
    state => state.type,
  );

function useInject() {
  useInjectReducer({ key: KEY, reducer });
}

export { useInject, set, clear, makeSelectMessage, makeSelectType };
