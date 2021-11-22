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
		interview,
		bookInterview,
		deleteInterview,
		student,
		interviewer,
		interviewers,
		id,
	} = props;

	const {
		mode,
		transition,
		back,
	} = useVisualMode(interview ? SHOW : EMPTY);

	const saveInterview = function (
		name,
		interviewer
	) {
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
				transition(ERROR_SAVE);
			});
	};

	const deleteInterviewItem = function () {
		transition(DELETING);
		deleteInterview(id).then(result =>
			transition(EMPTY)
		);
	};

	return (
		<article className='appointment'>
			<Header time={"5pm"} />
			{mode === EMPTY && (
				<Empty onAdd={() => transition(CREATE)} />
			)}
			{mode === CONFIRM && (
				<Confirm
					onConfirm={deleteInterviewItem}
				/>
			)}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === CREATE && (
				<Form
					onSave={saveInterview}
					onCancel={() => back()}
					interviewer={interviewer}
					interviewers={interviewers}
					student={student}
				/>
			)}
			{mode === SAVING && (
				<Status statusType='Saving' />
			)}
			{mode === DELETING && (
				<Status statusType='Deleting' />
			)}
		</article>
	);
}
