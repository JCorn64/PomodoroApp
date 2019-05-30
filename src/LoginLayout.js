import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import firebase from "./firebase.js";
import "./LoginLayout.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { TextArea } = Input;

const FormItem = Form.Item;

let mountNode = document.getElementById("root");

export default class LoginLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      tempRegistered: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  doRegister = () => {
    this.setState({
      tempRegistered: true
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
      });
  };

  doLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
      });
  };

  updateField(field, newValue) {
    this.setState({
      ...this.state,
      [field]: newValue
    });
  }

  render() {
    return (
      <div>
        <div className="fields">
          <div className="field">
            <Input
              placeholder="Enter your email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{ width: 300 }}
              onChange={e => this.updateField("email", e.target.value)}
            />
          </div>
          <div className="field">
            <Input
              placeholder="Enter your password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{ width: 300 }}
              onChange={e => this.updateField("password", e.target.value)}
            />
          </div>
          <div className="field">
            <Button
              className="registerButton"
              type="primary"
              icon="check"
              onClick={e => this.doRegister()}
              style={{ width: 300 }}
            >
              Register
            </Button>
          </div>
          <div className="field">
            <Button
              className="loginButton"
              type="primary"
              icon="login"
              onClick={e => this.doLogin()}
              style={{ width: 300 }}
            >
              Login
              {/* <a href={"/home"}>Log in</a> */}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

// const WrappedLoginLayout = Form.create()(LoginLayout);

// ReactDOM.render(<WrappedLoginLayout />, mountNode);

// export default WrappedLoginLayout
