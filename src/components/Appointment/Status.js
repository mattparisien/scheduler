import React from "react";

export default function Status(props) {

	const { statusType } = props;

	return (
		<main className='appointment__card appointment__card--status'>
			<img
				className='appointment__status-image'
				src='images/status.png'
				alt='Loading'
			/>
			<h1 className='text--semi-bold'>
				{statusType === 'saving' && 'Saving'}
				{statusType === 'cancelling' && 'Cancelling'}
				{statusType === 'deleting' && 'Deleting'}
			</h1>
		</main>
	);
}
