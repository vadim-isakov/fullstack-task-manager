import { put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createSelector } from 'reselect';
import fetcher from 'fetcher';
import {
  VIEW_TASK_RELATIVE_PATH,
  VIEW_TASK_ABSOLUTE_PATH,
} from '../../variables';
// Key
const STATE_KEY = 'EditTask';

// Actions
function editTask(taskId, newData) {
  return fetcher.fetch(STATE_KEY, {
    data: { ...newData, task_url: VIEW_TASK_ABSOLUTE_PATH },
    parameter: taskId,
  });
}

// Selectors
const { makeSelectRequestData } = fetcher.createMakeSelectors(STATE_KEY);
const makeSelectTaskId = () =>
  createSelector(
    makeSelectRequestData(),
    data => data.parameter,
  );

// On success saga
function* onSuccessSaga() {
  const taskId = yield select(makeSelectTaskId());
  yield put(push(`${VIEW_TASK_RELATIVE_PATH}/${taskId}`));
}
// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/tasks/`;
  const METHOD = 'PUT';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD, onSuccessSaga);
}

export { useInjectReducerSaga, editTask };
