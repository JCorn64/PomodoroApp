import React from "react";
import "./ReceiveUserInput.css";
// import { Icon } from "antd";
// import { Button } from "antd";
// import { Input } from "antd";
import { Button, Input, Icon } from "antd";
import "antd/dist/antd.css";

const { TextArea } = Input;

export default class ReceiveUserInput extends React.Component {
  render() {
    return (
      <div>
        <p />
        <div className="textAndButtons">
          <TextArea
            placeholder="Record completed task here!"
            autosize={{ minRows: 2, maxRows: 6 }}
            style={{ width: 300 }}
          />
          <div>
            <Button className="myButton" type="primary" icon="upload">
              Submit
            </Button>
            <Button className="myButton" type="primary" icon="undo">
              Undo
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
