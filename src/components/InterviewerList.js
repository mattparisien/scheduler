import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "../styles/InterviewerList.scss";

export default function InterviewerList(props) {
	// interviewers:array - an array of objects as seen above
	// setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
	// interviewer:number - a number that represents the id of the currently selected interviewer

	const interviewers = props.interviewers.map(
		person => {
			return (
				<InterviewerListItem
					key={person.id}
					id={person.id}
					name={person.name}
					avatar={person.avatar}
					setInterviewer={e =>
						props.setInterviewer(person.id)
					}
					selected={
						person.id === props.interviewer
					}
				/>
			);
		}
	);

	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>
				Interviewer
			</h4>
			<ul className='interviewers__list'>
				{interviewers}
			</ul>
		</section>
	);
}
