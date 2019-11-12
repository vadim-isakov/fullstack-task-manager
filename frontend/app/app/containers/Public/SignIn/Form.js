import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Typography } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useForm from 'react-hook-form';

import {
  FormWrapper,
  FormHeader,
  StyledIcon,
  SubmitButton,
  StyledFormItem,
} from '../formHelpers';

const LinkButton = styled(Button)`
  padding: 0px !important;
`;

function SignInForm({ message, handleSignIn }) {
  const { register, handleSubmit, setValue, errors } = useForm();

  const onSubmit = data => {
    handleSignIn(data.username, data.password);
  };

  useEffect(() => {
    register({ name: 'username' }, { required: true });
    register({ name: 'password' }, { required: true });
  }, []);

  return (
    <FormWrapper>
      <FormHeader>Sign in</FormHeader>
      <Form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
        <StyledFormItem item={errors.username} msg="Username is required">
          <Input
            name="username"
            prefix={<StyledIcon type="mail" />}
            placeholder="Username"
            onChange={e => setValue('username', e.target.value)}
          />
        </StyledFormItem>

        <StyledFormItem item={errors.password} msg="Password is required">
          <Input
            name="password"
            prefix={<StyledIcon type="lock" />}
            type="password"
            placeholder="Password"
            onChange={e => setValue('password', e.target.value)}
          />
        </StyledFormItem>

        {message && <Typography.Text type="danger">{message}</Typography.Text>}

        <StyledFormItem>
          <SubmitButton>Log in</SubmitButton>
          Or{' '}
          <Link to="/sign-up">
            <LinkButton type="link">register now!</LinkButton>
          </Link>
        </StyledFormItem>
      </Form>
    </FormWrapper>
  );
}

SignInForm.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleSignIn: PropTypes.func,
};

export default SignInForm;
