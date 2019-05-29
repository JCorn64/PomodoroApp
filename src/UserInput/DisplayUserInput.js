import React from "react";
import "./DisplayUserInput.css";
import { Row, Col } from "antd";
import { List, Typography } from "antd";
import ReceiveUserInput from "./ReceiveUserInput.js";
import { message, Avatar, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import "antd/dist/antd.css";

/**
 * TO DO
 *
 * Scroll bar for log of completed tasks
 * Push data to firebase
 */

export default class DisplayUserInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //   empty: true,
      //   currentEntry: "No tasks completed yet",
      currentEntry: "",
      allEntries: [],
      allDetailedEntries: []
    };
  }

  //   componentDidMount = () => {
  //     this.addNewEntry();
  //     this.setState({
  //       currentEntry: "",
  //       empty: false
  //     });
  //   };

  updateField(field, newValue) {
    this.setState({
      ...this.state,
      [field]: newValue
    });
  }

  addNewEntry = () => {
    let tempAllDetailedEntries = this.state.allDetailedEntries;
    // if (this.state.empty) {
    //   this.removeLastEntry();
    // }

    let fullDate = new Date();
    let year = fullDate.getFullYear();
    let month = fullDate.getMonth();
    let date = fullDate.getDate();
    let hours = fullDate.getHours();
    let minutes = fullDate.getMinutes();
    let seconds = fullDate.getSeconds();

    if (month < 9) {
      month = "0" + (month + 1);
    } else if (month == 9) {
      month++;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    console.log("year = " + fullDate.getFullYear());

    // Entire timestamp (date and time) -- Ex. 2019/05/29 11:41:03
    let tempTimestamp =
      "" +
      year +
      "/" +
      month +
      "/" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    // Just date -- Ex. 2019/05/29
    let tempDate = "" + year + "/" + month + "/" + date;

    // Just time -- Ex. 11:41:03
    let tempTime = "" + hours + ":" + minutes + ":" + seconds;

    let tempDetailedEntry = {
      task: this.state.currentEntry,
      timestamp: tempTimestamp,
      date: tempDate,
      time: tempTime
    };

    tempAllDetailedEntries[this.state.allDetailedEntries.length] = {
      tempDetailedEntry
    };

    this.setState({
      allDetailedEntries: tempAllDetailedEntries
    });
  };

  removeLastEntry = () => {
    let tempAllDetailedEntries = this.state.allDetailedEntries;
    tempAllDetailedEntries.pop();
    this.setState({
      allDetailedEntries: tempAllDetailedEntries
    });
  };

  render() {
    return (
      <div className="myClass">
        <p />
        <List
          size="large"
          header={
            <div className="myHeader">
              <strong>Completed Tasks</strong>
            </div>
          }
          bordered
          dataSource={this.state.allDetailedEntries}
          style={{ width: 450 }}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta title={item.tempDetailedEntry.task} />
              <div className="timestamp">
                <div>{item.tempDetailedEntry.date}</div>
                {item.tempDetailedEntry.time}
              </div>
            </List.Item>
          )}
        />
        <ReceiveUserInput
          updateParent={(field, newValue) => this.updateField(field, newValue)}
          addNewEntry={() => this.addNewEntry}
          removeLastEntry={() => this.removeLastEntry}
        />
      </div>
    );
  }
}
