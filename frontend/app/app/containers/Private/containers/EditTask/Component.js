import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import { ButtonsPanel, NavButton } from '../../components/ButtonsPanel';
import Form from './Form';

export default function EditTaskComponent({
  task,
  taskStatuses,
  users,
  taskId,
  handleEditTask,
}) {
  let content = (
    <Form
      task={task}
      taskStatuses={taskStatuses}
      users={users}
      handleEditTask={handleEditTask}
    />
  );
  if (!task || !users || !taskStatuses) {
    content = <Spin size="large" />;
  }
  return (
    <React.Fragment>
      <ButtonsPanel>
        <NavButton link={`/view-task/${taskId}`}>
          <Icon type="left" />
          Backward
        </NavButton>
      </ButtonsPanel>
      {content}
    </React.Fragment>
  );
}

EditTaskComponent.propTypes = {
  task: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  taskStatuses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleEditTask: PropTypes.func,
};
