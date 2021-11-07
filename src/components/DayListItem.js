import React from 'react';


export default function DayListItem(props) {
  
  return (
    <li onClick={() => props.setDay(props.name)} {...props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">There {props.spots === 1 ? " is 1 spot" : `are ${props.spots} spots`} remaining</h3>
    </li>
  )
}