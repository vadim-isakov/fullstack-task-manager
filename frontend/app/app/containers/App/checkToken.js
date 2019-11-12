import { createSelector } from 'reselect';
import fetcher from 'fetcher';
import * as tokenUtils from 'utils/token';

// Key
const STATE_KEY = 'CheckToken';

// Actions
function checkToken() {
  if (tokenUtils.get()) {
    return fetcher.fetch(STATE_KEY);
  }
  return fetcher.clear(STATE_KEY);
}

// Selectors
const selectors = fetcher.createMakeSelectors(STATE_KEY);
const makeSelectIsValid = () =>
  createSelector(
    selectors.makeSelectResponseData(),
    responseData => (responseData ? responseData.is_token_valid : false),
  );
selectors.makeSelectIsValid = makeSelectIsValid;

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/auth/check`;
  const METHOD = 'GET';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD);
}

export { useInjectReducerSaga, checkToken, selectors };
