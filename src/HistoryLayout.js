import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import { Timeline, Button } from "antd";
import firebase from "./firebase.js";
import "./HistoryLayout.css";

const { Header, Content, Sider } = Layout;

let mountNode = document.getElementById("root");

// will need to access all entries for a given user, put them in an array, then map through the array
// in render in order to place all entries in timeline

export default class HistoryLayout extends React.Component {
  // submenu keys of first level

  rootSubmenuKeys = ["sub1", "sub2", "sub3"];

  state = {
    openKeys: ["sub1"],
    allTasks: [],
    allDates: [],
    allTimes: [],
    ready: false,
    allDataInObject: []
  };

  retrieveHistory = async () => {
    let user = firebase.auth().currentUser;
    if (user == null) {
      console.log("no user");
    }
    if (user != null) {
      console.log("user exists");
      console.log(user.uid);
      let tasks = [];
      let dates = [];
      let times = [];

      const specificUserRef = firebase.database().ref(user.uid);

      await specificUserRef.on("value", function(snapshot) {
        snapshot.forEach(childSnapshot => {
          let tempTask = childSnapshot.val().task;
          tasks.unshift(tempTask);
          console.log("tempTask: " + tempTask);

          let tempDate = childSnapshot.val().date;
          dates.unshift(tempDate);
          console.log("tempDate: " + tempDate);

          let tempTime = childSnapshot.val().time;
          times.unshift(tempTime);
          console.log("tempTime: " + tempTime);
        });
      });

      await this.setState({
        allTasks: tasks,
        allDates: dates,
        allTimes: times,
        ready: true
      });
    }
  };

  manipulateData = async () => {
    /**
     * Want to construct object
     * <Key: Value>
     * Date: date
     * Time: time
     * Task: task
     */

    await this.retrieveHistory();

    console.log("AllTasks: " + this.state.allTasks);

    let tempAllDataInObject = [];

    for (let i = 0; i < this.state.allTasks.length; i++) {
      let tempObj = {
        entryDate: "" + this.state.allDates[i],
        entryTime: "" + this.state.allTimes[i],
        entryTask: "" + this.state.allTasks[i]
      };
      console.log("tempobjdate = " + tempObj.entryDate);
      tempAllDataInObject.push(tempObj);
    }

    console.log("tempAllObj" + JSON.stringify(tempAllDataInObject));

    if (tempAllDataInObject.length > 0) {
      console.log("test " + tempAllDataInObject[0].entryDate);
    }
    this.setState(
      {
        allDataInObject: tempAllDataInObject
      }
      // ,
      // console.log("dataobj = " + this.state.allDataInObject[0].tempObj.Task)
    );
    if (this.state.allDataInObject.length) {
      console.log("dataobj = " + JSON.stringify(this.state.allDataInObject));
    }
  };

  render() {
    // console.log(this.state.allTasks);
    // console.log(this.state.allDataInObject);
    return (
      <div>
        <h2>h</h2>

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

            {/******************************************************* */}

            <Content style={{ background: "#fff" }}>
              <h2>Completed Tasks</h2>
              <br />
              <Timeline style={{ width: "600px" }}>
                {this.state.allDataInObject ? (
                  Object.keys(this.state.allDataInObject).map((key, index) => {
                    console.log("render obj = " + obj);
                    return (
                      <Timeline.Item>
                        <p style={{ wordWrap: "break-word" }}>
                          {obj.entryDate}
                        </p>
                        <p style={{ wordWrap: "break-word" }}>
                          {obj.entryTime}
                        </p>
                      </Timeline.Item>
                    );
                  })
                ) : (
                  <div />
                )}

                <Timeline.Item>
                  <p style={{ wordWrap: "break-word" }}>
                    2015-09-01 Task Completed
                  </p>
                  <p style={{ wordWrap: "break-word" }}>
                    2015-09-01 Task Completed 2
                  </p>
                </Timeline.Item>
              </Timeline>
            </Content>
          </Layout>
        </Layout>
        <div className="testingStuff">
          <h3>hi</h3>
          <Button onClick={() => this.manipulateData()} />
        </div>
        <h3>hi</h3>
      </div>
    );
  }
}

ReactDOM.render(<HistoryLayout />, mountNode);
