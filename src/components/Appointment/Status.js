import React from "react";

export default function Status(props) {

	const { statusType } = props;

	console.log(statusType)

	return (
		<main className='appointment__card appointment__card--status'>
			<img
				className='appointment__status-image'
				src='images/status.png'
				alt='Loading'
			/>
			<h1 className='text--semi-bold'>
				hiii
				{statusType === 'saving' && 'Saving'}
				{statusType === 'cancelling' && 'Cancelling'}
				{statusType === 'deleting' && 'Deleting'}
			</h1>
		</main>
	);
}
