import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import { Provider } from 'react-redux';
import { rootReducer } from './store/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Home } from './components/home/home';
import { About } from './components/about/about';
import { login } from './store/authentication/actions';
import { isNull, isNullOrUndefined } from 'util';
import Recommender from './components/recommender/recommender';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Authenticate path="/authenticate"></Authenticate>

          <Route exact path="/recommender">
            <Recommender />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

function PrivateRoute({ children, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function isAuthenticated() {
  const state = store.getState().authentication;

  if (isNull(state.access_token) || isNull(state.valid_until)) {
    return false;
  }

  return state.valid_until > Date.now();
}

function Authenticate({ children, ...rest }: any) {
  let query = new URLSearchParams(useLocation().hash);;

  const accessToken = query.get('#access_token')!;

  // User denied access
  if(isNullOrUndefined(accessToken)) {
    return <Redirect to="/"/>
  }

  const validUntil = Date.now() + parseInt(query.get('expires_in')!) * 1000;
  store.dispatch(login(accessToken, validUntil));

  return <Redirect to="/recommender"/>;
}

export default App;
