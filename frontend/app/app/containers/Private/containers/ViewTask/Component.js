import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tag, Button, Card, Spin, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ContentWrapper from 'components/ContentWrapper';
import { ButtonsPanel, NavButton } from '../../components/ButtonsPanel';

const Header = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const StyledCard = styled(Card)`
  margin-top: 20px !important;
`;

const Field = styled.div`
  margin: 10px 0;
`;

function ViewTask({ task, taskStatuses, loading, CommentsList, CommentInput }) {
  let content = '';

  if (loading) {
    content = <Spin size="large" />;
  }
  if (task) {
    const taskStatusData = taskStatuses[task.status_id];
    const status = (
      <Tag color={taskStatusData.color}>{taskStatusData.name}</Tag>
    );
    const assignedUsers = [];
    Object.keys(task.assigned_users).forEach(key => {
      const el = <Tag key={key}>{task.assigned_users[key].email}</Tag>;
      assignedUsers.push(el);
    });

    content = (
      <ContentWrapper>
        <Header>{task.title}</Header>
        <div>
          <Link to={`/edit-task/${task.id}`}>
            <Button id="editButton" icon="edit">
              Edit
            </Button>
          </Link>
          <StyledCard>
            <Field>
              <b>Created at:</b> <span id="date">{task.date}</span>
            </Field>
            <Field>
              <b>Status:</b> {status}
            </Field>
            <Field>
              <b>Assigned users:</b> {assignedUsers}
            </Field>
            <Field>
              <b>Description:</b> {task.description}
            </Field>
          </StyledCard>
        </div>
        <br />
        {CommentsList}
        {CommentInput}
      </ContentWrapper>
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

ViewTask.propTypes = {
  task: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  taskStatuses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  CommentsList: PropTypes.object,
  CommentInput: PropTypes.object,
};

export default ViewTask;
