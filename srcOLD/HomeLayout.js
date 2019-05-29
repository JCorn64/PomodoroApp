import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import History from "./History.js";
import Login from "./Login.js";
import Timer from "./TimerC/Timer";
import UserInput from './UserInput/DisplayUserInput';

// https://reacttraining.com/react-router/web/example/sidebar

const { Header, Content, Sider } = Layout;

let mountNode = document.getElementById("root");

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/history",
    component: History
  },
  {
    path: "/login",
    component: Login
  }
];

export default class HomeLayout extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Router>
        <Layout>
          <Header className="header" style={{ background: "#fff" }}>
            <div className="logo" />
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[]}
              style={{ lineHeight: "34px", float: "right", width: "109px" }}
            >
              <Menu.Item key="logout" style={{ float: "right" }}>
                <Icon type="logout" />
                Logout
                <a href={"/login"} />
              </Menu.Item>
            </Menu>
          </Header>
          <Layout>
<<<<<<< HEAD
            <Sider width={200} style={{ background: "#fff", display: "flex" }}>
              <Menu
                onClick={this.handleClick}
                style={{ width: 150 }}
                defaultSelectedKeys={[]}
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
            </Sider>
            <Content style={{ background: "#fff" }}>
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
            </Content>
          </Layout>
        </Layout>
      </Router>
=======
    <Header className="header" style={{background: '#fff'}}>
      <div className="logo" />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[]}
        style={{ lineHeight: '34px', float: "right", width: '109px' }}
      >
        <Menu.Item key="logout" style={{float: "right"}}>
            <Icon type="logout" />
           Logout
           <a href={"/login"} />
        </Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff', display: "flex" }}>
        <Menu
            onClick={this.handleClick}
            style={{ width: 150 }}
            defaultSelectedKeys={[]}
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
          </Sider>
          <Content style={{ background: '#fff'}}>
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

          <div className='HomeItems'>
        <Timer />
        <UserInput />
      </div>
      
      </Content>

      

    </Layout>
  </Layout> 
  </Router>   
>>>>>>> 3a537c781f0efa86f8849ddc1ccb0a5bcaae60d4
    );
  }
}

ReactDOM.render(<HomeLayout />, mountNode);
