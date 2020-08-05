import React from "react";

import "components/DayListItem.scss";
let classNames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
    });
  
  const formatSpots = function(spots) {
    
    if (spots === 1) {
      return "1 spot remaining";
    } else if (spots > 1) {
      return spots + " spots remaining";
    } else {
      return "no spots remaining";
    }
  }

  console.log(props.spots);
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2> 
      
      
      <h3 className={dayClass}>{formatSpots(props.spots)}</h3>
    </li>
  );
  
}