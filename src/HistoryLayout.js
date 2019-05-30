import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "antd/dist/antd.css";

// https://reacttraining.com/react-router/web/example/sidebar

const { Header, Content, Sider } = Layout;

let mountNode = document.getElementById("root");

const SubMenu = Menu.SubMenu;

export default class HistoryLayout extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ["sub1", "sub2", "sub3"];
  state = {
    openKeys: ["sub1"]
  };
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };
  render() {
    return (
      <Layout>
        <Header
          className="header"
          style={{ background: "#fff", height: "20px" }}
        />
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
            <Menu
              mode="inline"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              style={{ width: 240 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <span>Date (most recent changes)</span>
                  </span>
                }
              >
                <Menu.Item key="1">Task 3</Menu.Item>
                <Menu.Item key="2">Task 2</Menu.Item>
                <Menu.Item key="3">Task 1</Menu.Item>
                <Menu.Item key="4">Etc</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <span>Date 2</span>
                  </span>
                }
              >
                <Menu.Item key="5">Task 2</Menu.Item>
                <Menu.Item key="6">Task 1</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <span>Date 3</span>
                  </span>
                }
              >
                <Menu.Item key="9">Task 4</Menu.Item>
                <Menu.Item key="10">Task 3</Menu.Item>
                <Menu.Item key="11">Task 2</Menu.Item>
                <Menu.Item key="12">Task 1</Menu.Item>
              </SubMenu>
            </Menu>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<HistoryLayout />, mountNode);
