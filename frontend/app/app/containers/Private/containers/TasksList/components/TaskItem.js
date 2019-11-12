import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Tag, Statistic } from 'antd';
import ListItem, { Meta as ListItemMeta } from 'antd/lib/list/Item';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const StyledItem = styled(ListItem)`
  padding: 12px 20px!important;

  .ant-list-item-meta-description {
    color: rgba(0, 0, 0, 0.77);
  }
  .ant-list-item-action {
    margin-left: 15px;
  }
`;

const StatusWrapper = styled.div`
  margin-left: 20px;
`;

const StatusEl = styled(Tag)`
  font-size: 14px;
`;

const TitleEl = styled(Button)`
  font-size: 16px !important;
  padding: 0px !important;
  font-weight: bold !important;
`;

const DateEl = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  margin-bottom: 9px;
`;

const StyledStatistic = styled(Statistic)`
  .ant-statistic-title {
    font-size: 13px;
  }
  .ant-statistic-content {
    font-size: 20px;
  }
`;

function TaskItem({ task, statusColor, statusName }) {
  return (
    <StyledItem
      className="task"
      actions={[
        <HashLink smooth to={`/view-task/${task.id.toString()}#comments`}>
          <StyledStatistic title="Comments" value={task.comments_count} />
        </HashLink>,
      ]}
    >
      <ListItemMeta
        title={
          <span>
            <Link to={`/view-task/${task.id.toString()}`}>
              <TitleEl type="link" className="title">
                {task.title}
              </TitleEl>
            </Link>
            <DateEl className="date">{task.date}</DateEl>
          </span>
        }
        description={
          <Truncate
            lines={3}
            ellipsis={
              <span>
                ...
                <Link to={`/view-task/${task.id.toString()}`}>
                  <Button type="link">Read more</Button>
                </Link>
              </span>
            }
          >
            {task.description}
          </Truncate>
        }
      />
      <StatusWrapper>
        <StatusEl color={statusColor}>{statusName}</StatusEl>
      </StatusWrapper>
    </StyledItem>
  );
}

TaskItem.propTypes = {
  task: PropTypes.object,
  statusColor: PropTypes.string,
  statusName: PropTypes.string,
};

export default TaskItem;
