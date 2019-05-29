import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Menu, Icon } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home.js";
import History from "./History.js";

// https://reacttraining.com/react-router/web/example/sidebar

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/history",
    component: History
  }
];

let mountNode = document.getElementById("root");

export default class NavBar extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <Menu
            onClick={this.handleClick}
            style={{ width: 150 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <Menu.Item key="home">
              <span>
                <Icon type="home" />
                <span>Home</span>
              </span>
              <a href={"/"} />
            </Menu.Item>
            <Menu.Item key="history">
              <span>
                <Icon type="history" />
                <span>History</span>
              </span>
              <a href={"/history"} />
            </Menu.Item>
          </Menu>

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
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<NavBar />, mountNode);
