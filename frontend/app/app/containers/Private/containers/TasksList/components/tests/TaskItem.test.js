import { Statistic as StatisticMock, Tag as TagMock } from 'antd';
import { Link as LinkMock } from 'react-router-dom';

import { Meta as ListItemMetaMock } from 'antd/lib/list/Item';
import TruncateMock from 'react-truncate';

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import TaskItem from '../TaskItem';

afterEach(cleanup);

jest.mock('antd', () => ({
  Button: jest.fn(({ className, children }) => (
    <div className={className}>{children}</div>
  )),
  Tag: jest.fn(({ color, children, className }) => (
    <div className={className} color={color}>
      {children}
    </div>
  )),
  Statistic: jest.fn(({ value, className }) => (
    <div className={className}>{value}</div>
  )),
}));

jest.mock('antd/lib/list/Item', () => ({
  __esModule: true,
  default: jest.fn(({ actions, children, className }) => (
    <div className={className}>
      {actions[0]}
      {children}
    </div>
  )),
  Meta: jest.fn(({ title, description, className }) => (
    <div className={className}>
      {title}
      {description}
    </div>
  )),
}));

jest.mock('react-truncate', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ to, children }) => <div to={to}>{children}</div>),
}));

jest.mock('react-router-hash-link', () => ({
  HashLink: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('<TasksItem />', () => {
  it('should render task data', () => {
    const props = {
      task: {
        id: 4,
        date: '2019-10-28 10:36',
        title: 'fsdf',
        description: 'ds',
        comments_count: 3,
      },
      statusColor: 'magenta',
      statusName: 'new',
    };

    render(<TaskItem {...props} />);

    const linkParts = LinkMock.mock.calls[0][0].to.split('/');
    const id = Number(linkParts[linkParts.length - 1]);

    const commentsCount = StatisticMock.mock.calls[0][0].value;

    const { container } = render(ListItemMetaMock.mock.calls[0][0].title);
    const title = container.firstChild.getElementsByClassName('title')[0]
      .textContent;
    const date = container.firstChild.getElementsByClassName('date')[0]
      .textContent;

    const description = TruncateMock.mock.calls[0][0].children;

    const { color, children } = TagMock.mock.calls[0][0];

    const received = {
      task: {
        id,
        title,
        date,
        description,
        comments_count: commentsCount,
      },
      statusColor: color,
      statusName: children,
    };
    expect(received).toMatchObject(props);
  });
});
