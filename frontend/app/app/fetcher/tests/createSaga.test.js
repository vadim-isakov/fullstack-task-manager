import { expectSaga } from 'redux-saga-test-plan';
import request from 'utils/request';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { success, error } from '../actions';
import { set as setMsg } from '../Message/redux';
import { start, done } from '../Progress/redux';
import { fetch } from '../createSaga';

const STATE_KEY = 'Test';

jest.mock('../createSelectors', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    makeSelectRequestData: () => () => 42,
  })),
}));

it('Should save result and start-done progress bar', () => {
  expectSaga(fetch, STATE_KEY, 'url', 'GET', () => {}, false)
    .provide([[matchers.call.fn(request), { data: 'data' }]])
    .put(start())
    .put(success(STATE_KEY, { data: 'data' }))
    .put(done())
    .run();
});

it('Should handle the error', () => {
  const err = new Error('error');
  expectSaga(fetch, STATE_KEY, 'url', 'GET', () => {}, false)
    .provide([[matchers.call.fn(request), throwError(err)]])
    .put(start())
    .put(error(STATE_KEY, err.message))
    .put(setMsg(err.message, 'error'))
    .put(done())
    .run();
});
