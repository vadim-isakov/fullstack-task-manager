import produce from 'immer';
import { createSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';

const KEY = 'Progress';

// Actions
const ON = `${KEY}/ON`;
const OFF = `${KEY}/OFF`;

const initialState = {
  loading: false,
};

// Reducer
/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ON:
        draft.loading = true;
        break;
      case OFF:
        draft.loading = false;
        break;
    }
  });

// Action Creators
function start() {
  return { type: ON };
}

function done() {
  return { type: OFF };
}

// Selectors
const selectState = state => state[KEY] || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectState,
    state => state.loading,
  );

function useInject() {
  useInjectReducer({ key: KEY, reducer });
}

export { useInject, start, done, makeSelectLoading };
