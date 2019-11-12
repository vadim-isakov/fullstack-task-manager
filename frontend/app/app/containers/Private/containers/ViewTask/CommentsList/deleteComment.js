import fetcher from 'fetcher';
import { put, select } from 'redux-saga/effects';
import { makeSelectTaskId, loadComments } from './loadComments';
// Key
const STATE_KEY = 'DeleteComment';

// Actions
function deleteComment(commentId) {
  return fetcher.fetch(STATE_KEY, commentId);
}

// Selectors
const { makeSelectLoading } = fetcher.createMakeSelectors(STATE_KEY);

// On success saga
function* onSuccessSaga() {
  const taskId = yield select(makeSelectTaskId());
  yield put(loadComments(taskId));
}

// Reducer and saga injector
function useInjectReducerSaga() {
  const REQUEST_URL = `/api/comments/`;
  const METHOD = 'DELETE';
  fetcher.inject(STATE_KEY, REQUEST_URL, METHOD, onSuccessSaga);
}

export { useInjectReducerSaga, deleteComment, makeSelectLoading };
