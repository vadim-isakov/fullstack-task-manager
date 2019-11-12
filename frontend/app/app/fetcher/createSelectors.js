import { createSelector } from 'reselect';

import { initialState } from './createReducer';

const selectState = (state, stateKey) => state[stateKey] || initialState;

const createMakeSelectors = stateKey => {
  const makeSelectRequestData = () =>
    createSelector(
      state => selectState(state, stateKey),
      currentState => currentState.request,
    );

  const makeSelectResponseData = () =>
    createSelector(
      state => selectState(state, stateKey),
      currentState => currentState.response,
    );

  const makeSelectErrorMsg = () =>
    createSelector(
      state => selectState(state, stateKey),
      currentState => currentState.errorMsg,
    );

  const makeSelectLoading = () =>
    createSelector(
      state => selectState(state, stateKey),
      currentState => currentState.loading,
    );

  const makeSelectFetched = () =>
    createSelector(
      state => selectState(state, stateKey),
      currentState => currentState.fetched,
    );

  return {
    makeSelectRequestData,
    makeSelectResponseData,
    makeSelectErrorMsg,
    makeSelectLoading,
    makeSelectFetched,
  };
};

export default createMakeSelectors;
