import React, { Component } from "react";
import { Icon, Input, Button } from "antd";
import "antd/dist/antd.css";
import firebase from "./firebase.js";
import "./LoginLayout.css";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import { red } from "@ant-design/colors";
import { Avatar } from "antd";

const { TextArea } = Input;

let mountNode = document.getElementById("root");

class LoginLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      tempRegistered: false,
      loggedIn: this.props.loggedIn,
      registered: this.props.registered
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
    let user = firebase.auth().currentUser;
    if (user != null) {
      firebase
        .auth()
        .signOut()
        .then(res => {
          console.log("logged " + user.email + " out");
        })
        .catch(function(error) {});
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function() {
        console.log("redirecting to home");
        return (window.location = "/home");
      })
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        return (window.location = "/");
      });
  };

  doLogin = () => {
    let user = firebase.auth().currentUser;

    if (user != null) {
      console.log("logged " + user.email + " out");
      firebase
        .auth()
        .signOut()
        .then(res => {})
        .catch(function(error) {});
    }
    const { state = {} } = this.props.location;
    const { prevLocation } = state;

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function() {
        console.log("redirecting to home");
        return (window.location = "/home");
      })
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
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
            <h1 color="red">Pomodoro App</h1>
          </div>
          <div className="field">
            <Avatar
              size={128}
              src="http://images.clipartpanda.com/tomato-clipart-mini-tomato.svg"
            />
          </div>

          <div className="field">
            <Input
              placeholder="Enter your email"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{ width: 300 }}
              onChange={e => this.updateField("email", e.target.value)}
              allowClear
            />
          </div>
          <div className="field">
            <Input
              placeholder="Enter your password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              style={{ width: 300 }}
              onChange={e => this.updateField("password", e.target.value)}
              allowClear
            />
          </div>
          <div className="field">
            {/* <a href={"/home"}> */}
            <Button
              className="loginButton"
              type="danger"
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
              type="danger"
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
