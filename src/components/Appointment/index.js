import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";
	const EDIT = "EDIT";
	const ERROR_SAVE = "ERROR_SAVE";
	const ERROR_DELETE = "ERROR_DELETE";
	const {
		time,
		interview,
		bookInterview,
		deleteInterview,
		student,
		interviewers,
		id,
	} = props;

	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	const saveInterview = function (name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};

		console.log(interview.student);

		transition(SAVING);
		console.log("in save....", interview);
		bookInterview(id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch(err => {
				transition(ERROR_SAVE, true);
			});
	};

	const deleteInterviewItem = function () {
		transition(DELETING, true);
		deleteInterview(id)
			.then(result => {
				transition(EMPTY);
			})
			.catch(err => transition(ERROR_DELETE, true));
	};

	return (
		<article className='appointment'>
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === CONFIRM && (
				<Confirm onCancel={() => back()} onConfirm={deleteInterviewItem} />
			)}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interview={interview}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === CREATE && (
				<Form
					onSave={saveInterview}
					onCancel={() => back()}
					interview={interview}
					interviewers={interviewers}
					student={student}
				/>
			)}
			{mode === EDIT && (
				<Form
					onSave={saveInterview}
					onCancel={() => back()}
					interviewer={interview.interviewer}
					interviewers={interviewers}
					interview={interview}
					student={student}
				/>
			)}
			{mode === SAVING && <Status statusMessage='Saving' />}
			{mode === DELETING && <Status statusMessage='Deleting' />}
		</article>
	);
}
