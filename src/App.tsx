import React from 'react';
import { history } from './history';
import { Router, Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IRootReducer } from "./redux/IRootReducer";
import { IUserState } from "./redux/states/IUserState";

import './App.css';

import Header from './Components/Header';
import DashboardComponent from './Components/Dashboard';
import LogoutComponent from './Components/Logout';
import LoginComponent from './Components/Login';
import SignupComponent from './Components/Signup';

function App({ children }: any) {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
    </div>
  );
}

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const user: IUserState | undefined = useSelector<IRootReducer, IUserState | undefined>(state => state.userReducer);
  
  return (
    <Route
      {...rest}
      render={(props: any) =>
        user?.email ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
};

const AppRouter = () => {
  return (
    <Router history={history}>
      <App>
        <Route exact path="/login" component={LoginComponent}/>
        <Route exact path="/signup" component={SignupComponent}/>
        <ProtectedRoute exact path="/" component={DashboardComponent} />
        <ProtectedRoute exact path="/logout" component={LogoutComponent} />
      </App>
    </Router>
  );
};

export default AppRouter;
