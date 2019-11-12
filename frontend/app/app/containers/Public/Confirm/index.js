import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Spin, Alert } from 'antd';
import { useInjectReducerSaga, confirm, selectors } from './redux';
const { makeSelectLoading, makeSelectErrorMsg } = selectors;

export function Confirm({ match, loading, errorMsg, dispatchConfirm }) {
  useInjectReducerSaga();

  useEffect(() => {
    dispatchConfirm(match.params.token);
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }
  if (errorMsg) {
    return (
      <Alert message="Confirmation error" description={errorMsg} type="error" />
    );
  }

  return '';
}

Confirm.propTypes = {
  loading: PropTypes.bool,
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  match: PropTypes.object,
  dispatchConfirm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  errorMsg: makeSelectErrorMsg(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchConfirm: token => dispatch(confirm(token)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Confirm);
