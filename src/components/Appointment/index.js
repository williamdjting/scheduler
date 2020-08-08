import React from "react";

import "components/Appointment/styles.scss";

// let classNames = require('classnames');

import Header from "components/Appointment/Header"

import Show from "components/Appointment/Show"

import Empty from "components/Appointment/Empty"

import useVisualMode from "hooks/useVisualMode.js"
import Form from "components/Appointment/Form.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { interview } = props;
  // if (props.interview) {
  //   return (  
  // }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <main>
      <header>{props.time}</header>
      <article className="appointment">Appointment</article>
      {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form
        interviewers={[]}
        onCancel={event => back()}
      />}
      {/* {props.interview ? <Show student={interview.student} interviewer={[interview.interviewer]} />  : <Empty />} */}
    </main>
    // console.log(props.student)
    // console.log(props.interviewer)
  )

}


