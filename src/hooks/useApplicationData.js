import React, { useState, useEffect } from "react";
import axios from "axios";
import InterviewerList from "components/InterviewerList";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		interviewers: {},
		appointments: {},
	});

	//Axios requests
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

	//SetDay Function
	const setDay = day => setState({ ...state, day });

	//Book an interview
	const bookInterview = function (id, interview) {
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

	//Delete an interview
	const deleteInterview = function (id) {
		const cancelInterview = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = state.appointments;
		appointments[id] = cancelInterview;

		return axios
			.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(result => {
				setState(prev => ({
					...prev,
					appointments: appointments,
				}));
			});
	};

	console.log(Object.values(state.appointments));

	const getNumberOfSpots = function () {
		let numOfSpots = 0;

		const numberOfSpots = Object.values(state.appointments).forEach(
			interview => {
				if (interview.interview === null) {
					numOfSpots++;
				}
			}
		);
		return numOfSpots;
	};

	console.log(getNumberOfSpots())

	return { state, setDay, bookInterview, deleteInterview };
}
