import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Spin as SpinMock, Alert as AlertMock } from 'antd';
import PublicMock from '../../Public';
import PrivateMock from '../../Private';
import { App } from '..';

afterEach(cleanup);
afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../checkToken', () => ({
  ...require.requireActual('../checkToken'),
  useInjectReducerSaga: jest.fn(() => ({})),
}));

jest.mock('fetcher/Progress', () => ({
  __esModule: true,
  default: jest.fn(() => <div />),
}));

jest.mock('fetcher/Message', () => ({
  __esModule: true,
  default: jest.fn(() => <div />),
}));

jest.mock('antd', () => ({
  Spin: jest.fn(() => <div />),
  Alert: jest.fn(() => <div />),
  Layout: jest.fn(({ className, children }) => (
    <div className={className}>{children}</div>
  )),
}));

jest.mock('../../Public', () => ({
  __esModule: true,
  default: jest.fn(() => <div />),
}));

jest.mock('../../Private', () => ({
  __esModule: true,
  default: jest.fn(() => <div />),
}));

jest.mock('utils/token', () => ({
  get: jest.fn(() => ({})),
  remove: jest.fn(() => ({})),
}));

describe('check App/index.js', () => {
  it('should return nothing', () => {
    render(
      <App
        loading={false}
        fetched={false}
        errorMsg={false}
        isTokenValid={false}
        dispatchCheckToken={() => ({})}
      />,
    );

    expect(SpinMock).toHaveBeenCalledTimes(0);
    expect(AlertMock).toHaveBeenCalledTimes(0);
    expect(PublicMock).toHaveBeenCalledTimes(0);
    expect(PrivateMock).toHaveBeenCalledTimes(0);
  });

  it('should return spinner', () => {
    render(
      <App
        loading
        fetched={false}
        errorMsg={false}
        isTokenValid={false}
        dispatchCheckToken={() => ({})}
      />,
    );

    expect(SpinMock).toHaveBeenCalledTimes(1);
    expect(AlertMock).toHaveBeenCalledTimes(0);
    expect(PublicMock).toHaveBeenCalledTimes(0);
    expect(PrivateMock).toHaveBeenCalledTimes(0);
  });

  it('should return alert', () => {
    render(
      <App
        loading={false}
        fetched={false}
        errorMsg
        isTokenValid={false}
        dispatchCheckToken={() => ({})}
      />,
    );

    expect(SpinMock).toHaveBeenCalledTimes(0);
    expect(AlertMock).toHaveBeenCalledTimes(1);
    expect(PublicMock).toHaveBeenCalledTimes(0);
    expect(PrivateMock).toHaveBeenCalledTimes(0);
  });

  it('should return public', () => {
    render(
      <App
        loading={false}
        fetched
        errorMsg={false}
        isTokenValid={false}
        dispatchCheckToken={() => ({})}
      />,
    );

    expect(SpinMock).toHaveBeenCalledTimes(0);
    expect(AlertMock).toHaveBeenCalledTimes(0);
    expect(PublicMock).toHaveBeenCalledTimes(1);
    expect(PrivateMock).toHaveBeenCalledTimes(0);
  });

  it('should return private', () => {
    render(
      <App
        loading={false}
        fetched
        errorMsg={false}
        isTokenValid
        dispatchCheckToken={() => ({})}
      />,
    );

    expect(SpinMock).toHaveBeenCalledTimes(0);
    expect(AlertMock).toHaveBeenCalledTimes(0);
    expect(PublicMock).toHaveBeenCalledTimes(0);
    expect(PrivateMock).toHaveBeenCalledTimes(1);
  });
});
