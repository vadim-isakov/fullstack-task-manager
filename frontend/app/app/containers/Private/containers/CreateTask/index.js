import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { message } from 'antd';

import CreateTaskComponent from './Component';

import {
  useInjectReducerSaga as useInjectSystemUsers,
  loadUsers,
  selectors as systemUsersSelectors,
} from '../SystemUsers';
import { selectors as userDataSelectors } from '../UserData';

import {
  useInjectReducerSaga as useInjectCreateTask,
  createTask,
} from './redux';

function CreateTask({ users, userId, dispatchLoadUsers, dispatchCreateTask }) {
  function handleCreateTask(task) {
    dispatchCreateTask(task);
  }

  useInjectSystemUsers();
  useInjectCreateTask();

  useEffect(() => {
    dispatchLoadUsers();
  }, []);

  return (
    <CreateTaskComponent
      users={users}
      userId={userId}
      handleCreateTask={handleCreateTask}
    />
  );
}

CreateTask.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  dispatchLoadUsers: PropTypes.func,
  dispatchCreateTask: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  users: systemUsersSelectors.makeSelectUsers(),
  userId: userDataSelectors.makeSelectUserId(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadUsers: () => dispatch(loadUsers()),
    dispatchCreateTask: task => dispatch(createTask(task)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CreateTask);
