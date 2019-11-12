import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import { ButtonsPanel, NavButton } from '../../components/ButtonsPanel';
import Form from './Form';

export default function CreateTaskComponent({
  users,
  userId,
  handleCreateTask,
}) {
  let content = '';
  if (!users || !userId) {
    content = <Spin size="large" />;
  } else {
    content = (
      <Form
        currentUserId={userId}
        users={users}
        handleCreateTask={handleCreateTask}
      />
    );
  }
  return (
    <React.Fragment>
      <ButtonsPanel>
        <NavButton link="/">
          <Icon type="left" />
          Backward
        </NavButton>
      </ButtonsPanel>
      {content}
    </React.Fragment>
  );
}

CreateTaskComponent.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  handleCreateTask: PropTypes.func,
};
