import "components/Application.scss";
import DayList from "components/DayList.js";
import React from "react";
import Appointment from "./Appointment/index.js";

import {
	getAppointmentsForDay,
	getInterviewer,
	getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData.js";

export default function Application(props) {
	let dailyInterviewers = [];
	let dailyAppts = [];

	const {
		state,
		setDay,
		bookInterview,
		deleteInterview,
	} = useApplicationData();

	console.log(state.days);

	dailyAppts = getAppointmentsForDay(state, state.day);
	dailyInterviewers = getInterviewersForDay(state, state.day);

	const schedule = dailyAppts.map(appointment => {
		const interview = getInterviewer(state, appointment.interview);

		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={dailyInterviewers}
				bookInterview={bookInterview}
				deleteInterview={deleteInterview}
			/>
		);
	});

	schedule.push(<Appointment key='last' time='5pm' />);

	return (
		<main className='layout'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList days={state.days} value={state.day} onChange={setDay} />
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>{schedule}</section>
		</main>
	);
}
