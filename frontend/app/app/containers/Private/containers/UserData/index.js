import { createSelector } from 'reselect';
import fetcher from 'fetcher';

// Key
const STATE_KEY = 'UserData';

// Actions
function loadUserData() {
  return fetcher.fetch(STATE_KEY);
}
const actions = { loadUserData };

// Selectors
const makeSelectors = fetcher.createMakeSelectors(STATE_KEY);
const { makeSelectErrorMsg } = makeSelectors;
const { makeSelectLoading } = makeSelectors;
const makeSelectData = makeSelectors.makeSelectResponseData;
const makeSelectUserId = () =>
  createSelector(
    makeSelectData(),
    data => (data ? data.id : false),
  );

const makeSelectIsSuperuser = () =>
  createSelector(
    makeSelectData(),
    data => (data ? data.is_superuser : false),
  );

const makeSelectUserEmail = () =>
  createSelector(
    makeSelectData(),
    data => (data ? data.email : false),
  );

const selectors = {
  makeSelectUserId,
  makeSelectIsSuperuser,
  makeSelectUserEmail,
  makeSelectErrorMsg,
  makeSelectLoading,
};

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/users/current`;
  const METHOD = 'GET';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD);
}

export { useInjectReducerSaga, actions, selectors };
