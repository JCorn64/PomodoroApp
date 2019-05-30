import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import HomeLayout from "./HomeLayout";
import HistoryLayout from "./HistoryLayout.js";
import LoginLayout from "./LoginLayout.js";
import Timer from "./TimerC/Timer";
import UserInput from "./UserInput/DisplayUserInput";

let mountNode = document.getElementById("root");

const routes = [
  {
    path: "/home",
    component: HomeLayout
  },
  {
    path: "/history",
    component: HistoryLayout
  },
  {
    path: "/",
    exact: true,
    component: LoginLayout
  }
];

class Routes extends React.Component {
  render() {
    return (
      <Router>
        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Router>
    );
  }
}

ReactDOM.render(<Routes />, mountNode);

export default withRouter(Routes);
