import { createSelector } from 'reselect';
import fetcher from 'fetcher';
import { CONFIRM_ABSOLUTE_PATH } from '../variables';

// Key
const STATE_KEY = 'SignUp';

// Actions
function signUp(username, email, password) {
  return fetcher.fetch(STATE_KEY, {
    email,
    password,
    username,
    confirm_url: CONFIRM_ABSOLUTE_PATH,
  });
}

// Selectors
const makeSelectors = fetcher.createMakeSelectors(STATE_KEY);
const {
  makeSelectErrorMsg,
  makeSelectRequestData,
  makeSelectFetched,
  makeSelectLoading,
} = makeSelectors;

const makeSelectEmail = () =>
  createSelector(
    makeSelectRequestData(),
    requestData => (requestData ? requestData.email : false),
  );

const makeSelectSent = makeSelectFetched;
const selectors = {
  makeSelectErrorMsg,
  makeSelectSent,
  makeSelectEmail,
  makeSelectLoading,
};

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/auth/init-confirmation`;
  const METHOD = 'POST';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD);
}

export { useInjectReducerSaga, signUp, selectors };
