import React from "react";
import { Route, Switch, Router } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import History from './History.js';
//import Login from "./Login.js";
import Layout from "./Layout.js";

class App extends React.Component {
  render() {
    const App = () => (
      <Router>
        <div>
          <Route exact path='/' component={Home}/>
          <Route path='/history' component={History}/>
          {/* <Route path="/login/" component={Login} /> */}
        </div>
      </Router>
    )
    return (
      <Switch>
        <Layout/>
        <App/>
      </Switch>
    );
  }
}

export default App;
