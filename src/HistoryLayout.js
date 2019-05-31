import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import { Timeline, Button } from "antd";
import firebase from "./firebase.js";
import "./HistoryLayout.css";
import { Avatar } from "antd";

const { Header, Content, Sider } = Layout;

let mountNode = document.getElementById("root");

export default class HistoryLayout extends React.Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub3"];

  state = {
    openKeys: ["sub1"],
    allTasks: [],
    allDates: [],
    allTimes: [],
    ready: false,
    newlyReady: true,
    allDataInObject: [],
    numbersUpToLength: [],
    user: null,
    email: "",
    tasksCompleted: 0
  };

  componentDidMount = () => {
    document.title = "Pomodoro App";
    this.retrieveHistory();
  };

  retrieveHistory = async user => {
    let counter = 0;
    let tempNumbers = [];
    let tasks = [];
    let dates = [];
    let times = [];
    let userEmail = "";

    let unsubscribe = await firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // User is signed in.
          console.log("user exists");
          console.log(user.uid);
          userEmail = user.email;

          const specificUserRef = firebase.database().ref(user.uid);

          // Populates 3 arrays with all content from DB: tasks, dates, times
          // used to have async here
          specificUserRef.on("value", function(snapshot) {
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

              tempNumbers.push(counter);
              counter++;
            });
          });

          console.log("Dates = " + dates);
        } else {
          // No user is signed in.
          console.log("no user");
        }

        this.setState(
          {
            allTasks: tasks,
            allDates: dates,
            allTimes: times,
            numbersUpToLength: tempNumbers,
            ready: true,
            email: userEmail
          },
          () => {
            this.forceUpdate();
          }
        );
      }.bind(this)
    );
  };

  render() {
    if (!this.state.ready) {
      this.retrieveHistory();
    }

    return (
      <div>
        <div className="headerContent">
          <div className="headerItem">
            <Avatar
              size={32}
              src="http://images.clipartpanda.com/tomato-clipart-mini-tomato.svg"
            />
          </div>
          <div className="headerItem">
            <h1>Pomodoro App</h1>
          </div>
        </div>
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
              <div className="bothSides">
                <div className="leftSide">
                  <h1>Completed Tasks</h1>
                  <h4>Hello, {this.state.email}</h4>
                  {this.state.ready && this.state.allDates.length > 0 ? (
                    <h4>
                      You have completed {this.state.allDates.length} tasks so
                      far
                    </h4>
                  ) : (
                    <p />
                  )}
                  <br />
                  <Button
                    type="danger"
                    size="large"
                    onClick={e => this.retrieveHistory()}
                  >
                    View Timeline
                  </Button>
                </div>
                <div className="rightSide">
                  <Timeline mode="alternate" style={{ width: "600px" }}>
                    {this.state.ready && this.state.allDates.length > 0 ? (
                      this.state.numbersUpToLength.map(index => {
                        return (
                          <Timeline.Item color="red">
                            <p style={{ wordWrap: "break-word" }}>
                              <strong>{this.state.allDates[index]}</strong>
                              {" at "}
                              {this.state.allTimes[index]}
                            </p>
                            <p style={{ wordWrap: "break-word" }}>
                              {this.state.allTasks[index]}
                            </p>
                          </Timeline.Item>
                        );
                      })
                    ) : (
                      <p />
                    )}
                  </Timeline>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

ReactDOM.render(<HistoryLayout />, mountNode);
