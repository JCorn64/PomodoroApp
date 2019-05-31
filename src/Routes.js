import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import HistoryLayout from "./HistoryLayout.js";
import LoginLayout from "./LoginLayout.js";

let mountNode = document.getElementById("root");

const ProtectedRoute = ({
  component: Component,
  path,
  loggedIn,
  registered,
  ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={props =>
      loggedIn === true || registered === true ? (
        <Component {...props} />
      ) : (
        (window.location = "/")
      )
    }
  />
);

class Routes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      registered: false
    };
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={LoginLayout} />

        <ProtectedRoute
          path="/home"
          loggedIn={this.state.loggedIn}
          registered={this.state.registered}
          component={HomeLayout}
        />
        <ProtectedRoute
          path="/history"
          loggedIn={this.state.loggedIn}
          registered={this.state.registered}
          component={HistoryLayout}
        />
      </Router>
    );
  }
}

ReactDOM.render(<Routes />, mountNode);
export default withRouter(Routes);
