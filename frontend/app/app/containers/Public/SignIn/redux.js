import { createSelector } from 'reselect';
import { call, put, select } from 'redux-saga/effects';
import fetcher from 'fetcher';
import { checkToken } from 'containers/App/checkToken';
import * as tokenUtils from 'utils/token';

// Key
const STATE_KEY = 'SignIn';

// Actions
function signIn(username, password) {
  return fetcher.fetch(STATE_KEY, { username, password });
}

// Selectors
const makeSelectors = fetcher.createMakeSelectors(STATE_KEY);
const { makeSelectErrorMsg, makeSelectResponseData } = makeSelectors;

const makeSelectToken = () =>
  createSelector(
    makeSelectResponseData(),
    responseData => (responseData ? responseData.access_token : false),
  );

// On success saga
function* onSuccessSaga() {
  const token = yield select(makeSelectToken());
  if (token) {
    yield call(tokenUtils.set, token);
    yield put(checkToken());
  }
}

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/auth/token`;
  const METHOD = 'POST';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD, onSuccessSaga, true);
}

export { useInjectReducerSaga, signIn, makeSelectErrorMsg };
