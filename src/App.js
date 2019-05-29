import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import History from "./History.js";
//import Login from "./Login.js";
import Layout from "./Layout.js";

class App extends React.Component {
  render() {
    return (
      <Layout />
    )
  }
}

export default App;
