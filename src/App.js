import React from "react";
import "./App.css";
import LoginLayout from "./LoginLayout.js";
import HomeLayout from "./HomeLayout.js";
import Routes from "./Routes.js";

function App() {
  return (
    <div className="NApp">
      <Routes />
      {/* <LoginLayout/>
      <HomeLayout /> */}
    </div>
  );
}

export default App;
