import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// https://reacttraining.com/react-router/web/example/sidebar

const { Header, Content, Sider } = Layout;

let mountNode = document.getElementById("root");

export default class HistoryLayout extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Router>
        <Layout>
          <Header
            className="header"
            style={{ background: "#fff", height: "20px" }}
          >
            <div className="logo" />
          </Header>
          <Layout>
            <Sider width={150} style={{ background: "#fff", display: "flex" }}>
              <Menu
                onClick={this.handleClick}
                style={{ width: 125 }}
                defaultSelectedKeys={[]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                <Menu.Item key="home">
                  <span>
                    <Icon type="home" />
                    <span>Home</span>
                  </span>
                  <a href={"/home"} />
                </Menu.Item>
                <Menu.Item key="history">
                  <span>
                    <Icon type="history" />
                    <span>History</span>
                  </span>
                  <a href={"/history"} />
                </Menu.Item>
                <Menu.Item key="logout">
                  <span>
                    <Icon type="logout" />
                    <span>Logout</span>
                  </span>
                  <a href={"/"} />
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ background: "#fff" }}>
              <div>History log here</div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(<HistoryLayout />, mountNode);
