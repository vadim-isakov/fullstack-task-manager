import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Spin, Alert } from 'antd';
import Progress from 'fetcher/Progress';
import Message from 'fetcher/Message';
import * as tokenUtils from 'utils/token';
import GlobalStyle from '../../global-styles';
import Wrapper from './Wrapper';
import Public from '../Public';
import Private from '../Private';

import {
  useInjectReducerSaga,
  checkToken,
  selectors as checkTokenSelectors,
} from './checkToken';

export function App({
  loading,
  fetched,
  errorMsg,
  isTokenValid,
  dispatchCheckToken,
}) {
  useInjectReducerSaga();
  useEffect(() => {
    if (tokenUtils.get()) {
      dispatchCheckToken();
    }
  }, []);

  useEffect(() => {
    if (fetched && !isTokenValid) {
      tokenUtils.remove();
    }
  }, [fetched]);

  if (errorMsg) {
    return <Alert message={errorMsg} type="error" />;
  }
  let content = '';
  if (loading) {
    content = <Spin size="large" />;
  } else if (isTokenValid) {
    content = <Private />;
  } else if (!tokenUtils.get() || (fetched && !isTokenValid)) {
    content = <Public />;
  }

  return (
    <Wrapper>
      <GlobalStyle />
      <Progress />
      <Message />
      {content}
    </Wrapper>
  );
}

App.propTypes = {
  loading: PropTypes.bool,
  isTokenValid: PropTypes.bool,
  fetched: PropTypes.bool,
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  dispatchCheckToken: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  errorMsg: checkTokenSelectors.makeSelectErrorMsg(),
  loading: checkTokenSelectors.makeSelectLoading(),
  fetched: checkTokenSelectors.makeSelectFetched(),
  isTokenValid: checkTokenSelectors.makeSelectIsValid(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCheckToken: () => dispatch(checkToken()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
