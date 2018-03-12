import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { getRouterData } from './common/router'

function RouterConfig({ history }) {
  const Base = getRouterData()['/'].component;
  
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Base} />
        <Route path="/user" component={() => <div>我是user</div>} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
