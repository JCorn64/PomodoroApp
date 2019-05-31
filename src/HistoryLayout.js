import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import { Timeline, Button } from "antd";
import firebase from "./firebase.js";
import "./HistoryLayout.css";

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
    allDataInObject: [],
    numbersUpToLength: [],
    user: null
  };

  componentDidMount = () => {
    this.retrieveHistory();
    this.setState(
      {
        random: true
      },
      () => {
        this.retrieveHistory();
      }
    );
  };

  retrieveHistory = async () => {
    let counter = 0;
    let tempNumbers = [];
    let tasks = [];
    let dates = [];
    let times = [];

    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("user exists");
        console.log(user.uid);

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

        // used to have async here
      } else {
        // No user is signed in.
        console.log("no user");
      }
    });
    this.setState(
      {
        allTasks: tasks,
        allDates: dates,
        allTimes: times,
        numbersUpToLength: tempNumbers
      },
      () => {
        console.log("did callback function");
      }
    );
  };

  render() {
    return (
      <div>
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
              <Timeline mode="alternate" style={{ width: "600px" }}>
                {this.state.allDates.length > 0 ? (
                  this.state.numbersUpToLength.map(index => {
                    return (
                      <Timeline.Item>
                        <p style={{ wordWrap: "break-word" }}>
                          {this.state.allDates[index]}{" "}
                          {this.state.allTimes[index]}
                        </p>
                        <p style={{ wordWrap: "break-word" }}>
                          {this.state.allTasks[index]}
                        </p>
                      </Timeline.Item>
                    );
                  })
                ) : (
                  <p>NO!</p>
                )}
              </Timeline>
            </Content>
          </Layout>
        </Layout>
        <div className="testingStuff">
          <h3>hi</h3>
          <Button onClick={e => this.retrieveHistory()} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<HistoryLayout />, mountNode);
