import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Button } from 'antd';
import * as tokenUtils from 'utils/token';
import { checkToken } from 'containers/App/checkToken';

const StyledButton = styled(Button)`
  color: inherit;
`;

function Logout({ dispatchCheckToken }) {
  const handleLogout = () => {
    tokenUtils.remove();
    dispatchCheckToken();
  };

  return (
    <StyledButton id='logoutButton' type="link" onClick={() => handleLogout()}>
      Logout
    </StyledButton>
  );
}

Logout.propTypes = {
  dispatchCheckToken: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCheckToken: () => dispatch(checkToken()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Logout);
