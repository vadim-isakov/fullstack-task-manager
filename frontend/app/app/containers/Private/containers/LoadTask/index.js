import { createSelector } from 'reselect';
import fetcher from 'fetcher';

// Key
const STATE_KEY = 'LoadTask';

// Actions
function loadTask(taskId) {
  return fetcher.fetch(STATE_KEY, taskId);
}

function clearTask() {
  return fetcher.clear(STATE_KEY);
}
const actions = { loadTask, clearTask };

// Selectors
const makeSelectors = fetcher.createMakeSelectors(STATE_KEY);
const { makeSelectErrorMsg } = makeSelectors;
const { makeSelectLoading } = makeSelectors;
const makeSelectTask = makeSelectors.makeSelectResponseData;
const makeSelectTaskId = () =>
  createSelector(
    makeSelectTask(),
    task => (task ? task.id : false),
  );

const selectors = {
  makeSelectTask,
  makeSelectTaskId,
  makeSelectErrorMsg,
  makeSelectLoading,
};

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/tasks/`;
  const METHOD = 'GET';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD);
}

export { useInjectReducerSaga, actions, selectors };
