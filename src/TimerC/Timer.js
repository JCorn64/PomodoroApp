import React from "react";
import Time from './TimeA';
import Controls from './Controls';
import Push from 'push.js';
import { _25, _05, _test } from './Helpers';
import './style.css'

export default class Timer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      interval: null,
      step: 0,
      phase: '',
      timeRemaining: this.getTimeRemaining(_25)
    };

    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.handleStopTimer = this.handleStopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.getTimeRemaining = this.getTimeRemaining.bind(this);
    this.nextPhase = this.nextPhase.bind(this);
    this.handlePushNotif = this.handlePushNotif.bind(this);
  }

  handleStartTimer() {
    if(!this.state.interval) {
      this.setState({ phase: this.state.step % 2 ===0 ? 'active' : 'rest'});
      this.startTimer();
    }
  }

  handleStopTimer() {
    if(this.state.interval) {
      console.log('stopping timer...');
      clearInterval(this.state.interval);
      this.setState({ interval: null, phase: ''});
    }
  }

  startTimer() {
    this.displayTime();
    this.setState({
      interval: setInterval(this.displayTime, 1000)
    });
  }

  displayTime() {
    if(this.state.timeRemaining.total > 0) {
      let timeRemaining = this.getTimeRemaining (
        this.state.timeRemaining.total - 1000
      );
      this.setState({ timeRemaining });

      if (timeRemaining.total === 60000) {
        let string = `1 minute of ${this.state.phase === 'active'
          ? 'work'
          : 'reset'} remaining`;
        this.handlePushNotif(string);
      }
    } else {
      this.nextPhase();
    }
  }

  getTimeRemaining(timeInMilli) {
    const total = timeInMilli,
      minutes = Math.floor(total / 1000 / 60 % 60),
      seconds = Math.floor(total / 1000 % 60) < 10
        ? '0' + Math.floor(total / 1000 % 60)
        : Math.floor(total / 1000 % 60);
    
    return { total, minutes, seconds }; 
  }

  nextPhase() {
    console.log('switvhing to next phase... ');

    let string = `Time's Up! ${this.state.phase === 'active'
      ? 'Take a Break!'
      : 'Crunch Time!'}`;
    this.handlePushNotif(string);

    this.handleStopTimer();
    let step = this.state.step + 1;

    this.setState ({
      step,
      timeRemaining: step % 2 === 0
        ? this.getTimeRemaining(_25)
        : this.getTimeRemaining(_05)
    });
  }

  handlePushNotif(string) {
    Push.create('Pomodoro', {
      body: string,
      timeout: 5000
    });
  }

  componentDidMount() {
    if (!('Notification' in window)) {
      return console.log('This Browser does not support desktop notifications')
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
