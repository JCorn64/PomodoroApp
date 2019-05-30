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
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.doLogin())
      .catch(function(error) {
        console.log("An account with this email already exists");
        // this.setState({
        //   registeredProperly: false,
        //   errorMessage: "An account with this email already exists"
        // });
        // Handle Errors here.
        // let errorCode = error.code;
        // let errorMessage = error.message;
        // ...
      });
  };

  doLogin = () => {
    let user = firebase.auth().currentUser;

    if (user != null) {
      console.log(user.email);
      firebase
        .auth()
        .signOut()
        .then(res => {
          console.log("logged " + user.email + "out");
          let user2 = firebase.auth().currentUser;
          console.log("logged " + user2.email + "in");
        })
        .catch(function(error) {
          // An error happened.
        });
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then()
      .catch(function(error) {
        console.log("Incorrect email or password");
        // this.setState({
        //   loggedInProperly: false,
        //   errorMessage: "Incorrect email or password"
        // });
        // Handle Errors here.
        // let errorCode = error.code;
        // let errorMessage = error.message;

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

// const WrappedLoginLayout = Form.create()(LoginLayout);

// ReactDOM.render(<WrappedLoginLayout />, mountNode);

// export default WrappedLoginLayout
