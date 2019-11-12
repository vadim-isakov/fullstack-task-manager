import { createSelector } from 'reselect';
import fetcher from 'fetcher';

// Key
const STATE_KEY = 'LoadComments';

// Actions
function loadComments(taskId) {
  return fetcher.fetch(STATE_KEY, taskId);
}

// Selectors
const {
  makeSelectResponseData,
  makeSelectLoading,
  makeSelectRequestData,
} = fetcher.createMakeSelectors(STATE_KEY);
const makeSelectComments = () =>
  createSelector(
    makeSelectResponseData(),
    comments => comments || [],
  );

const makeSelectTaskId = makeSelectRequestData;

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/comments/`;
  const METHOD = 'GET';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD);
}

export {
  useInjectReducerSaga,
  loadComments,
  makeSelectComments,
  makeSelectLoading,
  makeSelectTaskId,
};
