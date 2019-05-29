import React from "react";
import "./ReceiveUserInput.css";
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
            style={{ width: 450 }}
            onChange={e =>
              this.props.updateParent("currentEntry", e.target.value)
            }
          />
          <div>
            <Button
              className="submitButton"
              type="primary"
              icon="upload"
              onClick={this.props.addNewEntry()}
            >
              Submit
            </Button>
            <Button
              className="undoButton"
              type="primary"
              icon="undo"
              onClick={this.props.removeLastEntry()}
            >
              Undo
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
