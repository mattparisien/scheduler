import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		interviewers: {},
		appointments: {},
	});
  
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

	return { state, setDay, bookInterview, deleteInterview };
}
