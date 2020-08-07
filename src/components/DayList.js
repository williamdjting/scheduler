import DayListItem from "components/DayListItem";

import React from "react";

export default function DayList(props) {
  const days = props.days;
  const newDayListItems = days.map((day) => //an array of react components
    <DayListItem key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />

  );
  return ( //outputting the new array generated thru map to storybook as new UI
    <ul>
      {newDayListItems}
    </ul>
  );
}