import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectors as taskStatusesSelectors } from '../TaskStatuses';
import TasksListComponent from './components/TasksList';
import reduxFactory from './reduxFactory';
const { makeSelectTaskStatuses } = taskStatusesSelectors;

function containerCreator(stateKey, requestUrl, ButtonsPanel) {
  const {
    useInjectReducerSaga,
    loadTasks,
    clearTasks,
    makeSelectTasks,
    makeSelectFetched,
  } = reduxFactory(stateKey, requestUrl);

  function TasksList({
    tasks,
    taskStatuses,
    fetched,
    dispatchLoadTasks,
    dispatchClearTasks,
  }) {
    useInjectReducerSaga();

    useEffect(() => {
      dispatchLoadTasks();
      return function cleanup() {
        dispatchClearTasks();
      };
    }, []);

    return (
      <React.Fragment>
        {ButtonsPanel}

        <TasksListComponent
          tasks={tasks}
          taskStatuses={taskStatuses}
          loading={!fetched}
        />
      </React.Fragment>
    );
  }

  TasksList.propTypes = {
    tasks: PropTypes.array,
    taskStatuses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    fetched: PropTypes.bool,
    dispatchLoadTasks: PropTypes.func,
    dispatchClearTasks: PropTypes.func,
  };

  const mapStateToProps = createStructuredSelector({
    tasks: makeSelectTasks(),
    taskStatuses: makeSelectTaskStatuses(),
    fetched: makeSelectFetched(),
  });

  function mapDispatchToProps(dispatch) {
    return {
      dispatchLoadTasks: () => dispatch(loadTasks()),
      dispatchClearTasks: () => dispatch(clearTasks()),
    };
  }

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  return compose(withConnect)(TasksList);
}

export default containerCreator;
