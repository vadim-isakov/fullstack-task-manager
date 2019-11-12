import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { List as ListMock } from 'antd';
import TasksList from '../TasksList';
import TaskItemMock from '../TaskItem';

afterEach(cleanup);

jest.mock('antd', () => ({
  List: jest.fn(({ loading }) => <div loading={loading.toString()} />),
}));

jest.mock('../TaskItem', () => ({
  __esModule: true,
  default: jest.fn(({ task, statusColor, statusName }) => (
    <div task={task} statusColor={statusColor} statusName={statusName} />
  )),
}));

describe('<TasksList />', () => {
  it('should render loading', () => {
    const props = {
      tasks: [],
      taskStatuses: {},
      loading: true,
    };

    render(<TasksList {...props} />);

    expect(ListMock.mock.calls[0][0].loading).toBe(true);
  });
});

describe('<TasksList />', () => {
  it('should render tasks data', () => {
    const tasks = [
      {
        id: 4,
        date: '2019-10-28 10:36',
        status_id: 0,
        title: 'fsdf',
        description: 'ds',
        comments_count: 3,
      },
      {
        id: 3,
        date: '2019-10-27 15:14',
        status_id: 1,
        title: 'fg',
        description: 'fdsfsdfsdf',
        comments_count: 1,
      },
    ];

    const taskStatuses = {
      '0': {
        name: 'new',
        color: 'magenta',
        allowed: true,
      },
      '1': {
        name: 'in progress',
        color: 'orange',
        allowed: true,
      },
    };

    const props = {
      tasks,
      taskStatuses,
      loading: false,
    };

    render(<TasksList {...props} />);
    const { calls } = TaskItemMock.mock;

    for (let i = 0; i < calls.length; i += 1) {
      const task = tasks[i];
      const expectedStatus = taskStatuses[task.status_id.toString()];
      const expected = {
        task,
        statusColor: expectedStatus.color,
        statusName: expectedStatus.name,
      };
      const received = calls[i][0];
      expect(received).toMatchObject(expected);
    }
  });
});
