export function getAppointmentsForDay(state, day) {
	const filteredAppointments = state.days.filter(days => days.name === day);
	const appointmentsArray = [];

	if (filteredAppointments[0]) {
		const dayIds = filteredAppointments[0].appointments;

		for (const numAppoint of dayIds) {
			appointmentsArray.push(state.appointments[numAppoint]);
		}
	}
	return appointmentsArray;
}

// export function getAppointmentsForDay(state, day) {
// 	const finalAppointments = [];
// 	const filteredAppointments = state.days.filter(days => days.name === day);

// 	if (filteredAppointments[0]) {
// 		// console.log('filtered____', filteredAppointments)
// 		const days = filteredAppointments[0].appointments;

// 		days.forEach(appointment => {
// 			finalAppointments.push(state.appointments[appointment]);
// 		});
// 	}
// 	return finalAppointments;
// }

export function getInterviewer(state, interview) {
	if (interview) {
		const interviewer = state.interviewers[interview.interviewer];
		
		const finalInterview = {
			student: interview.student,
			interviewer: interviewer,
		};

		console.log(finalInterview);

		return finalInterview;
	}
	return null;
}

export function getInterviewersForDay(state, day) {
	const filteredInterviewers = state.days.filter(days => days.name === day);
	const interviewersArray = [];

	if (filteredInterviewers[0]) {
		const interviewerIds = filteredInterviewers[0].interviewers;

		for (const numInterviewer of interviewerIds) {
			interviewersArray.push(state.interviewers[numInterviewer]);
		}
	}
	return interviewersArray;
}
