import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

	const { interview, student, interviewer } = props;

	return (
		<article className='appointment'>
			<Header time={"5pm"} />
			{interview ? <Show student={student} interviewer={interviewer}/> : <Empty />}
		</article>
	);
}
