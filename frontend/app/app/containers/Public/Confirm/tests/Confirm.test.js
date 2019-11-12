import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Spin as SpinMock, Alert as AlertMock } from 'antd';
import { Confirm } from '..';

afterEach(cleanup);
afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../redux', () => ({
  ...require.requireActual('../redux'),
  useInjectReducerSaga: jest.fn(() => ({})),
}));

jest.mock('antd', () => ({
  Spin: jest.fn(() => <div />),
  Alert: jest.fn(() => <div />),
}));

describe('check Confirm/index.js', () => {
  it('should return nothing', () => {
    render(
      <Confirm
        loading={false}
        errorMsg={false}
        match={{
          params: {
            token: undefined,
          },
        }}
        dispatchConfirm={() => ({})}
      />,
    );

    expect(SpinMock).toHaveBeenCalledTimes(0);
    expect(AlertMock).toHaveBeenCalledTimes(0);
  });

  it('should return spinner', () => {
    render(
      <Confirm
        loading
        errorMsg={false}
        match={{
          params: {
            token: undefined,
          },
        }}
        dispatchConfirm={() => ({})}
      />,
    );

    expect(SpinMock).toHaveBeenCalledTimes(1);
    expect(AlertMock).toHaveBeenCalledTimes(0);
  });

  it('should return alert', () => {
    render(
      <Confirm
        loading={false}
        errorMsg
        match={{
          params: {
            token: undefined,
          },
        }}
        dispatchConfirm={() => ({})}
      />,
    );

    expect(SpinMock).toHaveBeenCalledTimes(0);
    expect(AlertMock).toHaveBeenCalledTimes(1);
  });
});
