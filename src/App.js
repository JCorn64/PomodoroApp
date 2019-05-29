import React from "react";
import "./App.css";
import Home from './Home';
import DisplayUserInput from "./UserInput/DisplayUserInput.js";

function App() {
  return (
    <div className="NApp">
      <DisplayUserInput />
      <Home/>
    </div>
  );
}

export default App;
