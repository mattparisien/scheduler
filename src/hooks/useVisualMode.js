import React, { useState, useEffect } from "react";

function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = (modeNew, replace = false) => {
		if (!replace) {
			setHistory(history => [modeNew, ...history]);
		}
		setMode(modeNew);
	};

	const backFunc = function () {
		if (history.length > 1) {
			setMode(history[1]);
			history.shift();
		}
	};

	return { mode, transition, backFunc };
}

export default useVisualMode;
