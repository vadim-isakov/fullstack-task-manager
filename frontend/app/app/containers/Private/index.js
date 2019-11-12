import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Spin, Alert } from 'antd';
import Switch from './Switch';
import Wrapper from './components/Wrapper';
import Logout from './containers/Logout';
import {
  useInjectReducerSaga as useInjectTaskStatuses,
  loadTaskStatuses,
  selectors as taskStatusesSelectors,
} from './containers/TaskStatuses';

import {
  useInjectReducerSaga as useInjectUserData,
  actions as userDataActions,
  selectors as userDataSelectors,
} from './containers/UserData';

function Private({
  userEmail,
  taskStatuses,
  taskStatusesLoading,
  taskStatusesErrorMsg,
  dispatchLoadTaskStatuses,
  userDataLoading,
  userDataErrorMsg,
  dispatchLoadUserData,
}) {
  useInjectTaskStatuses();
  useInjectUserData();

  useEffect(() => {
    dispatchLoadTaskStatuses();
    dispatchLoadUserData();
  }, []);
  if (taskStatusesLoading || userDataLoading) return <Spin size="large" />;

  if (taskStatusesErrorMsg)
    return (
      <Alert
        message={`Task statuses downloading failed. ${taskStatusesErrorMsg}`}
        type="error"
      />
    );
  if (userDataErrorMsg)
    return (
      <Alert
        message={`User data downloading failed. ${userDataErrorMsg}`}
        type="error"
      />
    );

  if (taskStatuses) {
    return (
      <Wrapper Logout={<Logout />} userEmail={userEmail}>
        <Switch />
      </Wrapper>
    );
  }
  return '';
}

Private.propTypes = {
  taskStatuses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  taskStatusesLoading: PropTypes.bool,
  taskStatusesErrorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  userDataLoading: PropTypes.bool,
  userDataErrorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  userEmail: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  dispatchLoadTaskStatuses: PropTypes.func,
  dispatchLoadUserData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  taskStatuses: taskStatusesSelectors.makeSelectTaskStatuses(),
  taskStatusesLoading: taskStatusesSelectors.makeSelectLoading(),
  taskStatusesErrorMsg: taskStatusesSelectors.makeSelectErrorMsg(),
  userDataLoading: userDataSelectors.makeSelectLoading(),
  userDataErrorMsg: userDataSelectors.makeSelectErrorMsg(),
  userEmail: userDataSelectors.makeSelectUserEmail(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadTaskStatuses: () => dispatch(loadTaskStatuses()),
    dispatchLoadUserData: () => dispatch(userDataActions.loadUserData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Private);
