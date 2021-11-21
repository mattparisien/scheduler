export const getAppointmentsForDay = function (state, day) {
	const finalAppointments = [];
	const filteredAppointments = state.days.filter(days => days.name === day);

	if (filteredAppointments[0]) {
		// console.log('filtered____', filteredAppointments)
		const days = filteredAppointments[0].appointments;

		days.forEach(appointment => {
			finalAppointments.push(state.appointments[appointment]);
		});
	}
	return finalAppointments;
};

export function getInterview(state, interview) {
	if (interview) {
		const interviewer = state.interviewers[interview.interviewer];

		const finalInterview = {
			student: interview.student,
			interviewer: interviewer,
		};

		return finalInterview;
	}
	return null;
}
