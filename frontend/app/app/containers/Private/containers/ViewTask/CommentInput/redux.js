import { put, select } from 'redux-saga/effects';
import fetcher from 'fetcher';
import { VIEW_TASK_ABSOLUTE_PATH } from '../../../variables';
import { selectors as loadTaskSelectors } from '../../LoadTask';

import { loadComments } from '../CommentsList/loadComments';
// Key
const STATE_KEY = 'CommentInput';

// Actions
function createComment(comment, taskId) {
  return fetcher.fetch(STATE_KEY, {
    text: comment,
    task_id: taskId,
    task_url: VIEW_TASK_ABSOLUTE_PATH,
  });
}

// Selectors
const makeSelectors = fetcher.createMakeSelectors(STATE_KEY);
const { makeSelectErrorMsg, makeSelectLoading } = makeSelectors;
const selectors = { makeSelectErrorMsg, makeSelectLoading };

// // On success saga
function* onSuccessSaga() {
  const taskId = yield select(loadTaskSelectors.makeSelectTaskId());
  yield put(loadComments(taskId));
}

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/comments/`;
  const METHOD = 'POST';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD, onSuccessSaga);
}

export { useInjectReducerSaga, createComment, selectors };
