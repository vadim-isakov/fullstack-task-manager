import { FETCH, SUCCESS, ERROR, CLEAR } from './constants';

export function fetch(stateKey, data = false) {
  return {
    type: `${stateKey}/${FETCH}`,
    data,
    stateKey,
  };
}

export function success(stateKey, data = false) {
  return {
    type: `${stateKey}/${SUCCESS}`,
    data,
    stateKey,
  };
}

export function error(stateKey, errorMsg) {
  return {
    type: `${stateKey}/${ERROR}`,
    errorMsg,
    stateKey,
  };
}

export function clear(stateKey) {
  return { type: `${stateKey}/${CLEAR}`, stateKey };
}
