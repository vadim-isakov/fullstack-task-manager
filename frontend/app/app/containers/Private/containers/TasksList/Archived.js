import React from 'react';
import { Icon } from 'antd';
import { ButtonsPanel, NavButton } from '../../components/ButtonsPanel';
import containerCreator from './containerCreator';

const Panel = (
  <ButtonsPanel>
    <NavButton link="/">
      <Icon type="left" />
      Backward
    </NavButton>
  </ButtonsPanel>
);

const STATE_KEY = 'ArchivedTasks';
const REQUEST_URL = '/api/tasks/archived';

export default containerCreator(STATE_KEY, REQUEST_URL, Panel);
