import React, { useState }  from "react";
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {

	const { student, interviewer, interviewers, onSave, onCancel } = props;

	const [studentName, setStudent] = useState(student || "");
	const [interviewerState, setInterviewer] = useState(interviewer || null);
	const [err, setErr] = useState(null);

	const validateInput = function (interviewer, student) {
    if (!student) {
      setErr("Please enter your name");
      return;
    }
    else if (!interviewer) {
      setErr("You must pick an interviewer");
      return;
    }
    else {
      setErr(null);
      onSave(student, interviewer);
    }
  }

	const reset = function() {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = function() {
    reset();
    onCancel();
  };

	


	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off' onSubmit={e => e.preventDefault()}>
					<input
						className='appointment__create-input text--semi-bold'
						name={studentName}
						type='text'
						placeholder='Enter Student Name'
						value={student}
						onChange={(e) => setStudent(e.target.value)}
						data-testid={"student-name-input"}
					/>
				</form>
				<span className="validation" style={{color: 'red'}}>{err && err}</span>
				<InterviewerList
					interviewers={interviewers}
					interviewer={interviewerState}
					setInterviewer={setInterviewer}
				/>
			</section>
			
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={cancel}>Cancel</Button>
					<Button confirm onClick={() => validateInput(interviewerState, studentName)}>Save</Button>
				</section>
			</section>
		</main>
	);
}
