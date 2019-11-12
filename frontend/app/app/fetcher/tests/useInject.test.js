import { cleanup } from 'react-testing-library';
import { useInjectReducer as useInjectReducerMock } from 'utils/injectReducer';
import { useInjectSaga as useInjectSagaMock } from 'utils/injectSaga';
import createReducerMock from '../createReducer';
import createSagaMock from '../createSaga';
import fetcher from '..';

afterEach(cleanup);

jest.mock('utils/injectReducer');
jest.mock('utils/injectSaga');
jest.mock('../createReducer');
jest.mock('../createSaga');

describe('check useInjectReducerSaga in fetcher/index.js ', () => {
  it('should pass correct data', () => {
    const STATE_KEY = 'Test';
    const REQUEST_URL = '/test/';
    const METHOD = 'Get';
    const ON_SUCCESS_SAGA = false;
    const IS_FORM = false;

    fetcher.inject(STATE_KEY, REQUEST_URL, METHOD, ON_SUCCESS_SAGA, IS_FORM);

    expect(useInjectReducerMock).toHaveBeenCalledWith({
      key: STATE_KEY,
      reducer: undefined,
    });
    expect(useInjectSagaMock).toHaveBeenCalledWith({
      key: STATE_KEY,
      saga: undefined,
    });
    expect(createReducerMock).toHaveBeenCalledWith(STATE_KEY);
    expect(createSagaMock).toHaveBeenCalledWith(
      STATE_KEY,
      REQUEST_URL,
      METHOD,
      ON_SUCCESS_SAGA,
      IS_FORM,
    );
  });
});
