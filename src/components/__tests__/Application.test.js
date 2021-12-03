import React from "react";

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
	it("changes the schedule when a new day is selected", () => {
		const { getByText } = render(<Application />);

		waitForElement(() => getByText("Monday")).then(() => 'hi');
	});
});
