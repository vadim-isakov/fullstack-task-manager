import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { message } from 'antd';
import { selectors as taskStatusesSelectors } from '../TaskStatuses';
import ViewTaskComponent from './Component';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';

import { useInjectReducerSaga, actions, selectors } from '../LoadTask';
const { makeSelectTask, makeSelectErrorMsg, makeSelectLoading } = selectors;

const { makeSelectTaskStatuses } = taskStatusesSelectors;

function ViewTask({
  task,
  taskStatuses,
  loading,
  errorMsg,
  dispatchLoadTask,
  dispatchClearTask,
  match,
}) {
  useInjectReducerSaga();

  useEffect(() => {
    dispatchLoadTask(match.params.id);
    return function cleanup() {
      dispatchClearTask();
    };
  }, []);

  if (errorMsg) {
    message.error(errorMsg);
  }
  const taskId = task ? task.id : false;
  return (
    <ViewTaskComponent
      task={task}
      taskStatuses={taskStatuses}
      loading={loading}
      CommentsList={<CommentsList taskId={taskId} />}
      CommentInput={<CommentInput taskId={taskId} />}
    />
  );
}

ViewTask.propTypes = {
  task: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  taskStatuses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  match: PropTypes.object,
  dispatchLoadTask: PropTypes.func,
  dispatchClearTask: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  taskStatuses: makeSelectTaskStatuses(),
  task: makeSelectTask(),
  loading: makeSelectLoading(),
  errorMsg: makeSelectErrorMsg(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadTask: taskId => dispatch(actions.loadTask(taskId)),
    dispatchClearTask: () => dispatch(actions.clearTask()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ViewTask);
