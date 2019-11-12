import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Alert } from 'antd';

import { useInjectReducerSaga, signUp, selectors } from './redux';

import Form from './Form';
const { makeSelectErrorMsg, makeSelectSent, makeSelectEmail } = selectors;

function SignUp({ email, sent, errorMsg, dispatchSignUp }) {
  useInjectReducerSaga();
  if (sent && !errorMsg) {
    return (
      <Alert
        message={`Confirmation link sent to email ${email}`}
        type="success"
        showIcon
      />
    );
  }
  return <Form handleSignUp={dispatchSignUp} message={errorMsg} />;
}

SignUp.propTypes = {
  email: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sent: PropTypes.bool,
  dispatchSignUp: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  errorMsg: makeSelectErrorMsg(),
  sent: makeSelectSent(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchSignUp: (username, email, password) =>
      dispatch(signUp(username, email, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SignUp);
