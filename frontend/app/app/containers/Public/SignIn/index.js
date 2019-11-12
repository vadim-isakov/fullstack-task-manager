import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducerSaga, signIn, makeSelectErrorMsg } from './redux';
import Form from './Form';

function SignIn({ errorMsg, dispatchSignIn }) {
  useInjectReducerSaga();
  return <Form handleSignIn={dispatchSignIn} message={errorMsg} />;
}

SignIn.propTypes = {
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  dispatchSignIn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  errorMsg: makeSelectErrorMsg(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSignIn: (username, password) =>
      dispatch(signIn(username, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SignIn);
