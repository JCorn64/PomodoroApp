import React from "react";
import { Button, Input, Icon } from "antd";
import "antd/dist/antd.css";

const Controls = props => {
  return (
    <div className="controls">
      {/* <button onClick={props.handleOnClickStart}>start</button>
      <button onClick={props.handleOnClickStop}>stop</button> */}
      <Button size="large" type="primary" onClick={props.handleOnClickStart}>
        Start
      </Button>
      <Button size="large" type="primary" onClick={props.handleOnClickStop}>
        Stop
      </Button>
    </div>
  );
};

export default Controls;
