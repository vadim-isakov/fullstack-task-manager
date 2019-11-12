import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Typography } from 'antd';
import useForm from 'react-hook-form';

import {
  FormWrapper,
  FormHeader,
  StyledIcon,
  SubmitButton,
  StyledFormItem,
} from '../formHelpers';

function SignUpForm({ message, handleSignUp }) {
  const { register, handleSubmit, setValue, errors } = useForm();
  const onSubmit = data => {
    handleSignUp(data.username, data.email, data.password);
  };

  useEffect(() => {
    register({ name: 'username' }, { required: true });
    register({ name: 'email' }, { required: true });
    register({ name: 'password' }, { required: true });
  }, []);

  return (
    <FormWrapper>
      <FormHeader>Sign up</FormHeader>
      <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <StyledFormItem item={errors.username} msg="Username is required">
          <Input
            prefix={<StyledIcon type="user" />}
            placeholder="Username"
            name="username"
            onChange={e => setValue('username', e.target.value)}
          />
        </StyledFormItem>

        <StyledFormItem item={errors.email} msg="Email is required">
          <Input
            prefix={<StyledIcon type="mail" />}
            placeholder="Email"
            name="email"
            onChange={e => setValue('email', e.target.value)}
          />
        </StyledFormItem>

        <StyledFormItem item={errors.password} msg="Password is required">
          <Input
            prefix={<StyledIcon type="lock" />}
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => setValue('password', e.target.value)}
          />
        </StyledFormItem>

        {message && <Typography.Text type="danger">{message}</Typography.Text>}

        <StyledFormItem>
          <SubmitButton>Sign up</SubmitButton>
        </StyledFormItem>
      </Form>
    </FormWrapper>
  );
}

SignUpForm.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleSignUp: PropTypes.func,
};

export default SignUpForm;
