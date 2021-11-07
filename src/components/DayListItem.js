import React from 'react';

export default function DayListItem(props) {
  return (
    <li>
      <h2 className="text--regular"> {/*day name goes here */} </h2>
      <h3 className="text--light"> {/* spots remaining for the day go here */}  </h3>
    </li>
  )
}