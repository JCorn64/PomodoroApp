import React from "react";
import Time from "./TimeA";
import Controls from "./Controls";
import Push from "push.js";
import { _25, _05, _test } from "./Helpers";
import "./style.css";
import firebase from "../firebase.js";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    // State used to hold our state variables
    this.state = {
      interval: null, // takes  a look at what the interval code is at at the time
      step: 0, // step checks weather the phase will be at a active or rest stage
      phase: "", // combines with the step to actualy cinfigure notifications and time setter to change between active and rest variables
      timeRemaining: this.getTimeRemaining(_25) // keeps track of time left on the reat timer
    };

    // Initiallizes the various functions that will be used later on
    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.handleStopTimer = this.handleStopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.getTimeRemaining = this.getTimeRemaining.bind(this);
    this.nextPhase = this.nextPhase.bind(this);
    this.handlePushNotif = this.handlePushNotif.bind(this);
  }

  // function used for both starting the timer, and if necessary checking if it is time to change the phase
  handleStartTimer() {
    if (!this.state.interval) {
      // an inline if statement to see if step is divisible by 2 to switch between the active and rest phase
      this.setState({ phase: this.state.step % 2 === 0 ? "active" : "rest" });
      // calls startTimer Function to actually start the timer.
      this.startTimer();
    }
  }

  // funciton used to handle to the stop button
  handleStopTimer() {
    if (this.state.interval) {
      // simple check to the console to confirm the stopping of the timer
      console.log("stopping timer...");
      // clears interval to actually stop the timer from counting down
      clearInterval(this.state.interval);
      // phase and interval are paused, essentially breaks down the timer to become a static image
      this.setState({ interval: null, phase: "" });
    }
  }

  // Methid that Start the Timer
  startTimer() {
    // Displays time, cals to other function
    this.displayTime();
    this.setState({
      // interval makes it begin to count down by a second
      interval: setInterval(this.displayTime, 1000)
    });
  }

  // Large method to send the actual time to the Timer component
  displayTime() {
    // checks if the timer has reached zero, if not it counts down by one second
    if (this.state.timeRemaining.total > 0) {
      let timeRemaining = this.getTimeRemaining(
        this.state.timeRemaining.total - 1000
      );
      this.setState({ timeRemaining });

      // sets a 1 minute reminder of each phase
      if (timeRemaining.total === 60000) {
        let string = `1 minute of ${
          this.state.phase === "active" ? "work" : "reset"
        } remaining`;
        this.handlePushNotif(string);
      }

      // once the phase ends it beigins the next phase
    } else {
      this.nextPhase();
    }
  }

  // A helper function to convert milli seconds into the basic Minutes and Seconds Fornat
  getTimeRemaining(timeInMilli) {
    const total = timeInMilli,
      minutes = Math.floor((total / 1000 / 60) % 60),
      seconds =
        Math.floor((total / 1000) % 60) < 10
          ? "0" + Math.floor((total / 1000) % 60)
          : Math.floor((total / 1000) % 60);

    return { total, minutes, seconds };
  }

  // switches phases from active to rest phase and vice versa
  nextPhase() {
    console.log("switching to next phase... ");

    // sends a simple notification to the user that the timer is switching phases
    let string = `Time's Up! ${
      this.state.phase === "active" ? "Take a Break!" : "Crunch Time!"
    }`;
    this.handlePushNotif(string);

    // stops the timer
    this.handleStopTimer();

    let step = this.state.step + 1; // increments step by one

    // sets step to be incremented and then switches starting time
    this.setState({
      step,
      timeRemaining:
        step % 2 === 0 ? this.getTimeRemaining(_25) : this.getTimeRemaining(_05)
    });
  }

  // Helper function which creates a notification for the user to see in their window
  handlePushNotif(string) {
    Push.create("Pomodoro", {
      body: string,
      timeout: 5000
    });
  }

  // Checking function to see if the user supports notifications
  componentDidMount() {
    if (!("Notification" in window)) {
      return console.log("This Browser does not support desktop notifications");
    }
    Push.Permission.request();
  }

  render() {
    return (
      <div className={`container ${this.state.phase}`}>
        <div className="timer">
          <Time time={this.state.timeRemaining} />
          <Controls
            handleOnClickStart={this.handleStartTimer}
            handleOnClickStop={this.handleStopTimer}
          />
        </div>
      </div>
    );
  }
} // END OF CLASS
