import DayListItem from "components/DayListItem";

import React from "react";

export default function DayList(props) {
  const days = props.days;
  const newDayListItems = days.map((day) => 
    <DayListItem key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />

  );
  return ( 
    <ul>
      {newDayListItems}
    </ul>
  );
}