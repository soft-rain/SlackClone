import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import AuthCode from "./components/views/LoginPage/AuthCode";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import Workspaces from "./components/views/Workspace/newWorkspace";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route exact path="/">
            <LandingPage />
          </Route> */}
          {/* Auth(specific Component, option, adminRoute) 
            option
            1. null : 아무나 출입 가능
            2. true: 로그인한 유저만 출입이 가능한 페이지
            3. false: 로그인한 유저는 출입 불가능한 페이지
          */}
          <Route exact path="/" component={Auth(LoginPage, null)} />
          <Route exact path="/landing" component={Auth(LandingPage, false)} />
          <Route exact path="/workspaces" component={Workspaces} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/authcode" component={Auth(AuthCode, null)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
