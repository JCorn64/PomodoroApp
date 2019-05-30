import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import { Timeline } from "antd";

const { Header, Content, Sider } = Layout;

let mountNode = document.getElementById("root");

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
          <h2>
            Completed Tasks
          </h2>
          <br/>
            <Timeline style={{ width: "600px" }}>
              <Timeline.Item>
                <p style={{ wordWrap: "break-word" }}>
                  2015-09-01 Task Completed
                </p>
                <p style={{ wordWrap: "break-word" }}>
                  2015-09-01 Task Completed 2
                </p>
              </Timeline.Item>
              <Timeline.Item>
                <p style={{ wordWrap: "break-word" }}>
                  2015-09-01 Task Completed
                </p>
              </Timeline.Item>
              <Timeline.Item>
                <p style={{ wordWrap: "break-word" }}>
                  2015-09-01 Task Completed
                </p>
                <p style={{ wordWrap: "break-word" }}>
                  2015-09-01 Task Completed 2
                </p>
                <p style={{ wordWrap: "break-word" }}>
                  2015-09-01 Task Completed 3
                </p>
              </Timeline.Item>
              <Timeline.Item>
                <p style={{ wordWrap: "break-word" }}>
                  2015-09-01 Task Completed
                </p>
              </Timeline.Item>
            </Timeline>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<HistoryLayout />, mountNode);
