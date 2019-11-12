import { call, put, select, take, fork } from 'redux-saga/effects';
import request from 'utils/request';
import * as tokenUtils from 'utils/token';
import { FETCH } from './constants';
import { success, error } from './actions';
import createMakeSelectors from './createSelectors';
import { set as setMsg } from './Message/redux';
import { start, done } from './Progress/redux';

export function* fetch(stateKey, requestURL, method, onSuccessSaga, isForm) {
  const { makeSelectRequestData } = createMakeSelectors(stateKey);

  //--------------
  // Preparing headers
  //--------------
  const headers = {};
  const token = yield call(tokenUtils.get);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  //--------------
  // Preparing url and params
  //--------------
  const params = { method, headers };

  let url = requestURL;
  const requestData = yield select(makeSelectRequestData());
  if (requestData) {
    if (['GET', 'DELETE'].includes(method)) {
      url += requestData;
    } else if (method === 'PUT') {
      if (requestData.parameter) {
        url += requestData.parameter;
      }
      params.body = JSON.stringify(requestData.data);
    } else if (isForm) {
      const formData = new URLSearchParams();

      Object.keys(requestData).forEach(key => {
        formData.append(key, requestData[key]);
      });

      params.body = formData;
    } else {
      params.body = JSON.stringify(requestData);
    }
  }

  try {
    yield put(start());
    const data = yield call(request, url, params);
    yield put(success(stateKey, data));
    if (onSuccessSaga) {
      yield* onSuccessSaga();
    }
    yield put(done());
  } catch (err) {
    yield put(error(stateKey, err.message));
    yield put(setMsg(err.message, 'error'));
    yield put(done());
  }
}

export default function createWatcher(
  stateKey,
  requestURL,
  method,
  onSuccessSaga,
  isForm,
) {
  return function* watchLoad() {
    let task;
    while (true) {
      yield take(`${stateKey}/${FETCH}`);
      let isTaskRunning = false;
      if (task) {
        if (task.isRunning()) {
          isTaskRunning = true;
        }
      }
      if (isTaskRunning) {
        yield put(setMsg('Request is still processing', 'warning'));
      } else {
        task = yield fork(
          fetch,
          stateKey,
          requestURL,
          method,
          onSuccessSaga,
          isForm,
        );
      }
    }
  };
}
