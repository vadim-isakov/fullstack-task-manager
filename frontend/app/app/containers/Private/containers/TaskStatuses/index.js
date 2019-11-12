import fetcher from 'fetcher';

// Key
const STATE_KEY = 'TaskStatuses';

// Actions
function loadTaskStatuses() {
  return fetcher.fetch(STATE_KEY);
}

// Selectors
const {
  makeSelectErrorMsg,
  makeSelectLoading,
  makeSelectResponseData,
} = fetcher.createMakeSelectors(STATE_KEY);
const makeSelectTaskStatuses = makeSelectResponseData;

const selectors = {
  makeSelectErrorMsg,
  makeSelectLoading,
  makeSelectTaskStatuses,
};

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/tasks/statuses`;
  const METHOD = 'GET';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD);
}

// export { useInjectReducerSaga, actions, selectors };
export { useInjectReducerSaga, loadTaskStatuses, selectors };
