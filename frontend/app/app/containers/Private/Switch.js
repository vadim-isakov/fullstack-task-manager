import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotArchivedTasks from './containers/TasksList/NotArchived';
import ArchivedTasks from './containers/TasksList/Archived';
import ViewTask from './containers/ViewTask';
import EditTask from './containers/EditTask';
import CreateTask from './containers/CreateTask';
import { VIEW_TASK_RELATIVE_PATH } from './variables';

function Swtich() {
  return (
    <Switch>
      <Route path="/" exact component={NotArchivedTasks} />
      <Route path="/archive" exact component={ArchivedTasks} />
      <Route path={`${VIEW_TASK_RELATIVE_PATH}/:id`} component={ViewTask} />
      <Route path="/edit-task/:id" component={EditTask} />
      <Route path="/create-task" component={CreateTask} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Swtich;
