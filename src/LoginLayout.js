import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import firebase from "./firebase.js";
import "./LoginLayout.css";

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
    console.log("REGISTER EMAIL " + this.state.email);
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
            </Button>
          </div>
        </div>

        {this.state.email.length > 0 ? <p>{this.state.email}</p> : <div />}
        {this.state.password.length > 0 ? (
          <p>{this.state.password}</p>
        ) : (
          <div />
        )}
        {this.state.tempRegistered ? <p>{"hi"}</p> : <div />}

        {/* <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem style={{ float: "none", width: "250px" }}>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem style={{ float: "none", width: "250px" }}>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{ float: "none", width: "250px" }}
            >
              Log in
            </Button>
            <br />
            Or <a href="">register now!</a>
          </FormItem>
        </Form> */}
      </div>
    );
  }
}

// const WrappedLoginLayout = Form.create()(LoginLayout);

// ReactDOM.render(<WrappedLoginLayout />, mountNode);

// export default WrappedLoginLayout
