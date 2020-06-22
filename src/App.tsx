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
import { createStore } from 'redux';

import { Home } from './components/home/home';
import { About } from './components/about/about';
import { login } from './store/authentication/actions';
import { isNull } from 'util';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Authenticate path="/authenticate"></Authenticate>

          <PrivateRoute exact path="/about">
            <About />
          </PrivateRoute>

          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

const fakeAuth = {
  isAuthenticated: false
};


function PrivateRoute({ children, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isNull(store.getState().authentication.access_token) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function Authenticate({ children, ...rest }: any) {
  let query = new URLSearchParams(useLocation().hash);;

  const accessToken = query.get('#access_token')!;
  const validUntil = Date.now().valueOf() + parseInt(query.get('expires_in')!) * 1000;
  store.dispatch(login(accessToken, validUntil));


  console.log(store.getState());

  return <Redirect to="/about"/>;
}

export default App;
