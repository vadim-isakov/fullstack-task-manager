import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import ContentWrapper from 'components/ContentWrapper';
import TaskItem from './TaskItem';

function TasksList({ tasks, taskStatuses, loading }) {
  return (
    <ContentWrapper style={{ padding: 0 }}>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={task => {
          const taskStatus = taskStatuses[task.status_id];
          return (
            <TaskItem
              key={task.id}
              task={task}
              statusColor={taskStatus.color}
              statusName={taskStatus.name}
            />
          );
        }}
      />
    </ContentWrapper>
  );
}

TasksList.propTypes = {
  tasks: PropTypes.array,
  taskStatuses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
};

export default TasksList;
