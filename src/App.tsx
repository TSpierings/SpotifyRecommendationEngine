import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import { Provider } from 'react-redux';
import { rootReducer } from './redux/index';
import { createStore } from 'redux';

import { Home } from './components/home/home';
import { About } from './components/about/about';
import { login } from './redux/modules/user';
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
        !isNull(store.getState().user.access_token) ? (
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

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().hash);
}

function Authenticate({ children, ...rest }: any) {
  let query = useQuery();

  store.dispatch({
    type: 'user/LOGIN',
    payload: {
      access_token: query.get('#access_token')!,
      valid_until: Date.now().valueOf() + parseInt(query.get('expires_in')!) * 1000
    }
  });

  console.log(store.getState());

  return <Redirect to="/about"/>;
}

export default App;
