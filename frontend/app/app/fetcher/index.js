import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import createReducer from './createReducer';
import createSaga from './createSaga';
import * as actions from './actions';
import createMakeSelectors from './createSelectors';

function useInjectReducerSaga(
  stateKey,
  requestURL,
  method,
  onSuccessSaga = false,
  isForm = false,
) {
  useInjectReducer({ key: stateKey, reducer: createReducer(stateKey) });
  useInjectSaga({
    key: stateKey,
    saga: createSaga(stateKey, requestURL, method, onSuccessSaga, isForm),
  });
}

export default {
  inject: useInjectReducerSaga,
  fetch: actions.fetch,
  clear: actions.clear,
  createMakeSelectors,
};
