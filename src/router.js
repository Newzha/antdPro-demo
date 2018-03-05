import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import { getRouterData } from './common/router'

function RouterConfig({ history }) {
  const Base = getRouterData()['/'].component;
  
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Base} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
