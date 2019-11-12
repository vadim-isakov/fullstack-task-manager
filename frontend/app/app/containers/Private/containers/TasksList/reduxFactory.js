import { createSelector } from 'reselect';
import fetcher from 'fetcher';

function reduxFactory(stateKey, requestUrl) {
  // Actions
  function loadTasks() {
    return fetcher.fetch(stateKey);
  }

  function clearTasks() {
    return fetcher.clear(stateKey);
  }

  // Selectors
  const {
    makeSelectResponseData,
    makeSelectFetched,
  } = fetcher.createMakeSelectors(stateKey);

  const makeSelectTasks = () =>
    createSelector(
      makeSelectResponseData(),
      tasks => tasks || [],
    );

  // Reducer and saga injector
  function useInjectReducerSaga() {
    const REQUEST_URL = requestUrl;
    const METHOD = 'GET';
    fetcher.inject(stateKey, REQUEST_URL, METHOD);
  }

  return {
    useInjectReducerSaga,
    loadTasks,
    clearTasks,
    makeSelectTasks,
    makeSelectFetched,
  };
}
export default reduxFactory;
