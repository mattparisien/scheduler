import React, { useState, useEffect } from "react";

function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = (newMode, replace = false) => {
		if (!replace) {
			setHistory([newMode, ...history]);
		}
		setMode(newMode);
	};

	const back = () => {
		if (history.length > 1) {
			setMode(history[1]);
			history.shift();
		}
	};

	return { mode, transition, back };
}

export default useVisualMode;
