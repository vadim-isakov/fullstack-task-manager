import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonsPanel = styled.div`
  margin-bottom: 30px;
`;

function NavButton({ link, children, buttonType, isGhost, leftMargin }) {
  const marginLeft = leftMargin ? '20px' : 'inherit';
  return (
    <Link to={link} style={{ marginLeft }}>
      <Button ghost={isGhost} type={buttonType}>
        {children}
      </Button>
    </Link>
  );
}

NavButton.propTypes = {
  link: PropTypes.string,
  buttonType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isGhost: PropTypes.bool,
  leftMargin: PropTypes.bool,
};

export { ButtonsPanel, NavButton };
