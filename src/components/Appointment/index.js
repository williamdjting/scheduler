import React from "react";

import "components/Appointment/styles.scss";

// let classNames = require('classnames');

import Header from "components/Appointment/Header"

import Show from "components/Appointment/Show"

import Empty from "components/Appointment/Empty"

export default function Appointment(props) {
  const {interview} = props;
  // if (props.interview) {
  //   return (  
  // }

  return (
    
    <main>
      <header>{props.time}</header>
      <article className="appointment">Appointment</article>
      {props.interview ? <Show student={interview.student} interviewer={[interview.interviewer]} />  : <Empty />}
    </main>
    // console.log(props.student)
    // console.log(props.interviewer)
  )
  
}


