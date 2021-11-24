import "components/Application.scss";
import DayList from "components/DayList.js";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment/index.js";
import axios from "axios";
import {
	getAppointmentsForDay,
	getInterviewer,
	getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData.js";

export default function Application(props) {
	let dailyInterviewers = [];
	let dailyAppts = [];

	const { state, setDay, bookInterview, deleteInterview } = useApplicationData();

	useEffect(() => {
		Promise.all([
			axios.get(`http://localhost:8001/api/days`),
			axios.get(`http://localhost:8001/api/appointments`),
			axios.get(`http://localhost:8001/api/interviewers`),
		]).then(all => {
			setState(prev => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	const setDay = day => setState({ ...state, day });

	const bookInterview = function (id, interview) {
		//update existing appointment slot
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = state.appointments;
		appointments[id] = appointment;

		return axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(result => {
				setState(prev => ({
					...prev,
					appointments: appointments,
				}));
			});
	};

	dailyAppts = getAppointmentsForDay(state, state.day);
	dailyInterviewers = getInterviewersForDay(state, state.day);

	const schedule = dailyAppts.map(appointment => {
		const interviewer = getInterviewer(state, appointment.interview);

		console.log(interviewer);

		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interviewer}
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
