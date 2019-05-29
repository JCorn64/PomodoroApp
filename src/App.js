import React from "react";
import "./App.css";
import HomeLayout from "./HomeLayout";
import DisplayUserInput from "./UserInput/DisplayUserInput.js";

function App() {
  return (
    <div className="NApp">
      <HomeLayout />
      <DisplayUserInput />
    </div>
  );
}

export default App;
