import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import EditTaskComponent from './Component';

import { selectors as taskStatusesSelectors } from '../TaskStatuses';
import {
  useInjectReducerSaga as useInjectSystemUsers,
  loadUsers,
  selectors as systemUsersSelectors,
} from '../SystemUsers';

import {
  useInjectReducerSaga as useInjectViewTask,
  actions as loadTaskActions,
  selectors as loadTaskSelectors,
} from '../LoadTask';

import { useInjectReducerSaga as useInjectEditTask, editTask } from './redux';

const { makeSelectTaskStatuses } = taskStatusesSelectors;

function isArraysEqual(arr1, arr2) {
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

function EditTask({
  task,
  users,
  taskStatuses,
  match,
  dispatchLoadTask,
  dispatchLoadUsers,
  dispatchClearTask,
  dispatchEditTask,
}) {
  function handleEditTask(formValues) {
    const newTaskData = {};
    if (task.title !== formValues.title) {
      newTaskData.title = formValues.title;
    }

    const formStatusId = parseInt(formValues.statusId, 10);
    if (task.status_id !== formStatusId) {
      newTaskData.status_id = formStatusId;
    }

    const assignedUsersIds = task.assigned_users.map(
      assignedUser => assignedUser.id,
    );

    if (!isArraysEqual(assignedUsersIds, formValues.assignedUsers)) {
      newTaskData.assigned_users_ids = formValues.assignedUsers;
    }

    if (task.description !== formValues.description) {
      newTaskData.description = formValues.description;
    }

    if (Object.keys(newTaskData).length > 0) {
      dispatchEditTask(match.params.id, newTaskData);
    }
  }

  useInjectSystemUsers();
  useInjectViewTask();
  useInjectEditTask();

  useEffect(() => {
    dispatchLoadTask(match.params.id);
    dispatchLoadUsers();
    return function cleanup() {
      dispatchClearTask();
    };
  }, []);
  return (
    <EditTaskComponent
      task={task}
      taskStatuses={taskStatuses}
      users={users}
      taskId={match.params.id}
      handleEditTask={handleEditTask}
    />
  );
}

EditTask.propTypes = {
  match: PropTypes.object,
  task: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  taskStatuses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatchLoadTask: PropTypes.func,
  dispatchLoadUsers: PropTypes.func,
  dispatchClearTask: PropTypes.func,
  dispatchEditTask: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  task: loadTaskSelectors.makeSelectTask(),
  users: systemUsersSelectors.makeSelectUsers(),
  taskStatuses: makeSelectTaskStatuses(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadTask: taskId => dispatch(loadTaskActions.loadTask(taskId)),
    dispatchLoadUsers: () => dispatch(loadUsers()),
    dispatchClearTask: () => dispatch(loadTaskActions.clearTask()),
    dispatchEditTask: (taskId, newData) => dispatch(editTask(taskId, newData)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditTask);
