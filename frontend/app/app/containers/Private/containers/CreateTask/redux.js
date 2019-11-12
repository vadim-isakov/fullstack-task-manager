import { put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import fetcher from 'fetcher';
import { push } from 'connected-react-router';
import {
  VIEW_TASK_RELATIVE_PATH,
  VIEW_TASK_ABSOLUTE_PATH,
} from '../../variables';
// Key
const STATE_KEY = 'CreateTask';

// Actions
function createTask(task) {
  return fetcher.fetch(STATE_KEY, {
    title: task.title,
    description: task.description,
    assigned_users: task.assigned_users,
    task_url: VIEW_TASK_ABSOLUTE_PATH,
  });
}

// Selectors
const { makeSelectResponseData } = fetcher.createMakeSelectors(STATE_KEY);
const makeSelectTaskId = () =>
  createSelector(
    makeSelectResponseData(),
    data => data.task_id,
  );

// On success saga
function* onSuccessSaga() {
  const taskId = yield select(makeSelectTaskId());
  yield put(push(`${VIEW_TASK_RELATIVE_PATH}/${taskId}`));
}
// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/tasks/`;
  const METHOD = 'POST';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD, onSuccessSaga);
}

export { useInjectReducerSaga, createTask };
