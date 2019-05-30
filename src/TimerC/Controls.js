import React from "react";
import { Button, Input, Icon } from "antd";
import "antd/dist/antd.css";

// sets up both the start and stop buttons for the timer, uses Ant Design
const Controls = props => {
  return (
    <div className="controls">
      
      {/* Start Button to Begin the Timer */}
      <Button size="large" type="primary" onClick={props.handleOnClickStart}>
        Start
      </Button>

      {/*  Stop Button to pause the Timer */}
      <Button size="large" type="primary" onClick={props.handleOnClickStop}>
        Stop
      </Button>
    </div>
  );
};

export default Controls;
