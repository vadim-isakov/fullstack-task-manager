import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, Tag } from 'antd';
import styled from 'styled-components';
import useForm from 'react-hook-form';
import ContentWrapper from 'components/ContentWrapper';
import FormItem from 'components/FormItem';

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonWrapper = styled(Form.Item)`
  margin-top: 20px;
  margin-bottom: 0px !important;
`;

const StatusEl = styled(Tag)`
  font-size: 15px;
`;

function EditTaskForm({ task, taskStatuses, users, handleEditTask }) {
  const currentStatusId = task.status_id.toString();
  const curentUserIds = task.assigned_users.map(userData => userData.id);

  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      title: task.title,
      statusId: currentStatusId,
      assignedUsers: curentUserIds,
      description: task.description,
    },
  });

  useEffect(() => {
    register({ name: 'title' }, { required: true });
    register({ name: 'statusId' }, { required: true });
    register({ name: 'assignedUsers' });
    register({ name: 'description' });
  }, []);

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 10 },
  };

  const taskStatusesOptions = [];
  Object.keys(taskStatuses).forEach(key => {
    const taskStatus = taskStatuses[key];
    if (taskStatus.allowed || currentStatusId === key) {
      taskStatusesOptions.push(
        <Select.Option key={key} value={key}>
          <StatusEl color={taskStatus.color}>{taskStatus.name}</StatusEl>
        </Select.Option>,
      );
    }
  });

  const onSubmit = data => {
    handleEditTask(data);
  };

  return (
    <ContentWrapper>
      <FormHeader>Edit task</FormHeader>
      <Form
        {...formItemLayout}
        onSubmit={handleSubmit(onSubmit)}
        className="edit-task-form
      "
      >
        <FormItem label="Title" item={errors.title} msg="Title is required">
          <Input
            placeholder="Title"
            id="title"
            name="title"
            onChange={e => setValue('title', e.target.value)}
            defaultValue={task.title}
          />
        </FormItem>

        <Form.Item label="Status">
          <Select
            id="status"
            name="statusId"
            onChange={value => setValue('statusId', value)}
            defaultValue={currentStatusId}
          >
            {taskStatusesOptions}
          </Select>
        </Form.Item>

        <Form.Item label="Assigned users">
          <Select
            mode="multiple"
            placeholder="Assigned users"
            name="assignedUsers"
            onChange={values => setValue('assignedUsers', values)}
            defaultValue={curentUserIds}
          >
            {users.map(user => (
              <Select.Option key={user.id} value={user.id}>
                {user.email}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea
            rows={6}
            placeholder="Description"
            name="description"
            onChange={e => setValue('description', e.target.value)}
            defaultValue={task.description}
          />
        </Form.Item>

        <ButtonWrapper
          wrapperCol={{
            sm: { offset: 7 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </ButtonWrapper>
      </Form>
    </ContentWrapper>
  );
}

EditTaskForm.propTypes = {
  task: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  taskStatuses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  handleEditTask: PropTypes.func,
};

export default EditTaskForm;
