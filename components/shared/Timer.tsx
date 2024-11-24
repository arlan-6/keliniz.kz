import { Minus } from "lucide-react";
import React from "react";
import { useTimer } from "react-timer-hook";

export function Timer({
	expiryTimestamp,
	className,
}: {
	expiryTimestamp: Date;
	className?: string;
}) {
	const {
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn("onExpire called"),
	});

	return (
		<div className={className}>
			<div className="flex gap-4 justify-around">
				<span>Days <br /> {days}</span>
				{/* <Minus /> */}
				<span>Hours <br /> {hours}</span>
				{/* <Minus /> */}

				<span>Minuts <br /> {minutes}</span>
				{/* <Minus /> */}

				<span>Seconds <br /> {seconds}</span>
			</div>
			{/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
			{/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button> */}
		</div>
	);
}
