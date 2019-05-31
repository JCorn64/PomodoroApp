import React from "react";
import "./App.css";
import LoginLayout from "./LoginLayout.js";
import HomeLayout from "./HomeLayout.js";
import Routes from "./Routes.js";

function App() {
  return (
    <div className="NApp">
      <head>
        <title>Pomodoro App</title>
      </head>
      <Routes />
      {/* <LoginLayout/>
      <HomeLayout /> */}
    </div>
  );
}

export default App;
