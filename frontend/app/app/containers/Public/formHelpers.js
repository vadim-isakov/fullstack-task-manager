import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';
import styled from 'styled-components';
import ContentWrapper from 'components/ContentWrapper';
import FormItem from 'components/FormItem';

const FormWrapper = styled(ContentWrapper)`
  width: 300px;
`;

const FormHeader = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const StyledIcon = styled(Icon)`
  color: 'rgba(0,0,0,.25)';
`;

function StyledFormItem(props) {
  const { children, ...newProps } = props;
  if (!newProps.style) {
    newProps.style = {};
  }
  newProps.style.marginBottom = 0;
  return <FormItem {...newProps}>{children}</FormItem>;
}

StyledFormItem.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
};

function SubmitButton({ children }) {
  return (
    <StyledButton type="primary" htmlType="submit">
      {children}
    </StyledButton>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FormWrapper, FormHeader, StyledIcon, SubmitButton, StyledFormItem };
