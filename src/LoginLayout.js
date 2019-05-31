import React, { Component } from "react";
import { Icon, Input, Button } from "antd";
import "antd/dist/antd.css";
import firebase from "./firebase.js";
import "./LoginLayout.css";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

const { TextArea } = Input;

let mountNode = document.getElementById("root");

class LoginLayout extends React.Component {
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
      .then(function() {
        // this.props.updateParent('registered', true);
        return (window.location = "/home");
      })
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // this.props.updateParent('registered', false);
        // return (window.location = "/");
      });
  };

  doLogin = () => {
    const { state = {} } = this.props.location;
    const { prevLocation } = state;

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function() {
        // this.props.updateParent('loggedIn', true);
        return (window.location = "/home");
      })
      .catch(function(error) {
        // Handle Errors here.
        // let errorCode = error.code;
        // let errorMessage = error.message;
        // this.props.updateParent('loggedIn', false);
        return (window.location = "/");
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
      <div className="everything">
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
            {/* <a href={"/home"}> */}
            <Button
              className="loginButton"
              type="primary"
              icon="login"
              onClick={e => this.doLogin()}
              style={{ width: 300 }}
            >
              Login
            </Button>
            {/* </a> */}
          </div>
          <div className="field">
            {/* <a href={"/home"}> */}
            <Button
              className="registerButton"
              type="primary"
              icon="check"
              onClick={e => this.doRegister()}
              style={{ width: 300 }}
            >
              Register
            </Button>
            {/* </a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginLayout);

// const WrappedLoginLayout = Form.create()(LoginLayout);

// ReactDOM.render(<WrappedLoginLayout />, mountNode);

// export default WrappedLoginLayout
