import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { Link as LinkMock } from 'react-router-dom';
import Archived from '../Archived';
import NotArchived from '../NotArchived';

afterEach(cleanup);
afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../containerCreator', () => ({
  __esModule: true,
  default: jest.fn((stateKey, requestUrl, Panel) => ({
    stateKey,
    requestUrl,
    Panel,
  })),
}));

jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ to, children }) => <span to={to}>{children}</span>),
}));

describe('<Archived /> ', () => {
  it('should check <Archived /> component content', () => {
    const { Panel, requestUrl, stateKey } = Archived;

    expect(requestUrl.length).not.toEqual(0);
    expect(stateKey.length).not.toEqual(0);

    const { getByText } = render(Panel);
    expect(getByText(/Backward/i)).toBeDefined();
    expect(LinkMock.mock.calls.length).toBe(1);
  });
});

describe('<NotArchived /> ', () => {
  it('should check <NotArchived /> component content', () => {
    const { Panel, requestUrl, stateKey } = NotArchived;

    expect(requestUrl.length).not.toEqual(0);
    expect(stateKey.length).not.toEqual(0);

    const { getByText } = render(Panel);
    expect(getByText(/Create task/i)).toBeDefined();
    expect(getByText(/Archived tasks/i)).toBeDefined();
    expect(LinkMock.mock.calls.length).toBe(2);
  });
});
