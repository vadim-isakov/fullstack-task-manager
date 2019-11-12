import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select } from 'antd';
import styled from 'styled-components';
import useForm from 'react-hook-form';
import ContentWrapper from 'components/ContentWrapper';
import FormItem from 'components/FormItem';

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonWrapper = styled(Form.Item)`
  margin-top: 30px;
  margin-bottom: 0px !important;
`;

function CreateTaskForm({ users, currentUserId, handleCreateTask }) {
  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      assignedUsers: [currentUserId],
      description: '',
    },
  });
  const onSubmit = data => {
    const task = {
      title: data.title,
      description: data.description,
      assigned_users: data.assignedUsers,
    };
    handleCreateTask(task);
  };

  useEffect(() => {
    register({ name: 'title' }, { required: true });
    register({ name: 'description' });
    register({ name: 'assignedUsers' });
  }, []);

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 10 },
  };

  return (
    <ContentWrapper>
      <FormHeader>Create task</FormHeader>
      <Form
        {...formItemLayout}
        onSubmit={handleSubmit(onSubmit)}
        className="create-task-form"
      >
        <FormItem label="Title" item={errors.title} msg="Title is required">
          <Input
            placeholder="Title"
            name="title"
            onChange={e => setValue('title', e.target.value)}
          />
        </FormItem>

        <FormItem
          item={errors.assignedUsers}
          msg="Assigned users are required"
          style={{ marginTop: '15px' }}
          label="Assigned users"
        >
          <Select
            mode="multiple"
            placeholder="Assigned users"
            name="assignedUsers"
            onChange={values => setValue('assignedUsers', values)}
            defaultValue={[currentUserId]}
          >
            {users &&
              users.map(user => (
                <Select.Option key={user.id} value={user.id}>
                  {user.email}
                </Select.Option>
              ))}
          </Select>
        </FormItem>

        <FormItem style={{ marginTop: '25px' }} label="Description">
          <Input.TextArea
            placeholder="Description"
            rows={3}
            name="description"
            onChange={e => setValue('description', e.target.value)}
          />
        </FormItem>

        <ButtonWrapper
          wrapperCol={{
            sm: { offset: 7 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </ButtonWrapper>
      </Form>
    </ContentWrapper>
  );
}

CreateTaskForm.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  currentUserId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  handleCreateTask: PropTypes.func,
};

export default CreateTaskForm;
