import React, { Component } from "react";
import { Icon, Input, Button } from "antd";
import "antd/dist/antd.css";
import firebase from "./firebase.js";
import "./LoginLayout.css";

const { TextArea } = Input;

let mountNode = document.getElementById("root");

export default class LoginLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
      .then(res => {
        console.log("logged " + this.state.email + " in");
      })
      .catch(function(error) {
        console.log("An account with this email already exists");
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

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        let user2 = firebase.auth().currentUser;
        console.log("logged " + user2.email + " in");
      })
      .catch(function(error) {
        console.log("Incorrect email or password");
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
            <a href={"/home"}>
              <Button
                className="loginButton"
                type="primary"
                icon="login"
                onClick={e => this.doLogin()}
                style={{ width: 300 }}
              >
                Login
              </Button>
            </a>
          </div>
          <div className="field">
            <a href={"/home"}>
              <Button
                className="registerButton"
                type="primary"
                icon="check"
                onClick={e => this.doRegister()}
                style={{ width: 300 }}
              >
                Register
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
