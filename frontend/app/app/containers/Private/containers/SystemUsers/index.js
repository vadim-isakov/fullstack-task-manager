import fetcher from 'fetcher';

// Key
const STATE_KEY = 'SystemUsers';

// Actions
function loadUsers() {
  return fetcher.fetch(STATE_KEY);
}

// Selectors
const {
  makeSelectErrorMsg,
  makeSelectLoading,
  makeSelectResponseData,
} = fetcher.createMakeSelectors(STATE_KEY);
const makeSelectUsers = makeSelectResponseData;

const selectors = {
  makeSelectErrorMsg,
  makeSelectLoading,
  makeSelectUsers,
};

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/users/`;
  const METHOD = 'GET';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD);
}

// export { useInjectReducerSaga, actions, selectors };
export { useInjectReducerSaga, loadUsers, selectors };
