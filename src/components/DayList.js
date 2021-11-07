import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  // responsible for rendering a set of <DayList/> components
  // days:Array an array of objects (each object represents a day and includes an id, name, and spots)
  // day:String the currently selected day
  // setDay: Function sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"

  const dayListItems = props.days.map(day => <DayListItem id={day.id} name={day.name} spots={day.spots}/>)

  return (
    <ul>
      {dayListItems}
    </ul>
  )

}