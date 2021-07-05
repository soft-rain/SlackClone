import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import AuthCode from "./components/views/LoginPage/AuthCode";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import Workspaces from "./components/views/Workspace";
function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {/* <Route exact path="/">
            <LandingPage />
          </Route> */}
          {/* 깔끔하게 바꿔보자 */}
          {/* Auth(specific Component, option, adminRoute) 
            option
            1. null : 아무나 출입 가능
            2. true: 로그인한 유저만 출입이 가능한 페이지
            3. false: 로그인한 유저는 출입 불가능한 페이지
          */}
          <Route exact path="/" component={Auth(LoginPage, null)} />
          <Route exact path="/landing" component={Auth(LandingPage, false)} />
          {/* <Route exact path="/landing" component={LandingPage} /> */}
          <Route exact path="/workspaces" component={Workspaces} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/authcode" component={Auth(AuthCode, null)} />

          {/* exact이 붙어있으면 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여준다. */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
