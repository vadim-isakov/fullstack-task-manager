import React from 'react';
import { ButtonsPanel, NavButton } from '../../components/ButtonsPanel';
import containerCreator from './containerCreator';

const Panel = (
  <ButtonsPanel>
    <NavButton link="/create-task" buttonType="primary">
      Create task
    </NavButton>
    <NavButton link="/archive" buttonType="primary" isGhost leftMargin>
      Archived tasks
    </NavButton>
  </ButtonsPanel>
);

const STATE_KEY = 'NotArchivedTasks';
const REQUEST_URL = '/api/tasks/';

export default containerCreator(STATE_KEY, REQUEST_URL, Panel);
