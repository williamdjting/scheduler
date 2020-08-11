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
const SAVING = "SAVING";

export default function Appointment(props) {
  //const { interview } = props;
  // if (props.interview) {
  //   return (  
  // }

  const save = function(name, interviewer) {
    //Implementing the Update
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then((err, res) => {
        transition(SHOW)
      })
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <main>
      <header>{props.time}</header>
      <article className="appointment">Appointment</article>
      {mode === SAVING && 'Saving?'}
      {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={event => back()}
        onSave={save}
      />}
      {/* {props.interview ? <Show student={interview.student} interviewer={[interview.interviewer]} />  : <Empty />} */}
    </main>
    // console.log(props.student)
    // console.log(props.interviewer)
  )

}


