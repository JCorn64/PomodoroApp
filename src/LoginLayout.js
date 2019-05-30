import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const FormItem = Form.Item;

let mountNode = document.getElementById("root");

class LoginLayout extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Router>
        <Form onSubmit={this.handleSubmit} className="login-form">
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
              {/* <a href={"/home"}>Log in</a> */}
            </Button>
            <br />
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </Router>
    );
  }
}

const WrappedLoginLayout = Form.create()(LoginLayout);

ReactDOM.render(<WrappedLoginLayout />, mountNode);

export default WrappedLoginLayout;
