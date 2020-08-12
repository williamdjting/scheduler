import React from "react";

import "components/DayListItem.scss";
let classNames = require('classnames');

export default function DayListItem(props) {


  const spotsRemaining = (count) => {
    if (count <= 0) {
      return 'No spots left.'
    } else if (count === 1) {
      return 'One spot left.'
    } else {
      return `${count} spots left.`
    }
  }



  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
    });
  
 
  console.log("prop spots", props.spots);
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2> 
      <h3 className={dayClass}>{spotsRemaining(props.spots)}</h3>
    </li>
  );
  
}