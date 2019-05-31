import React from 'react';

// sets up the Timer to use props to obtain the minues and seconds registered in the Timer.js file
const Time = (props) => {
	return (
		<span className="time">{`${props.time.minutes}:${props.time.seconds}`}</span>
	)
}

export default Time;
