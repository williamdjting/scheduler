import React, { Fragment, useState, useEffect } from 'react';

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";

import Show from "components/Appointment/Show";

import Empty from "components/Appointment/Empty";

import useVisualMode from "hooks/useVisualMode.js";
import Form from "components/Appointment/Form.js";

import Status from "components/Appointment/Status.js";

import Confirm from "components/Appointment/Confirm.js";

import Error from "components/Appointment/Error.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        return transition(SHOW);
      }).catch(error => transition(ERROR_SAVE, true));
  };

  const edit = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);

    props
      .editInterview(props.id, interview)
      .then(() => {

        return transition(SHOW);
      }).catch(error => transition(ERROR_SAVE, true));
  };


  const cancel = function () {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <main>
      <Header time={props.time} />
      <article className="appointment" data-testid="appointment">Appointment</article>
      {mode === CONFIRM && (
        <Confirm
          message="Please confirm you would like to delete"
          onConfirm={cancel}
          onCancel={(event) => transition(SHOW)} //use to be back()
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === EMPTY && <Empty onAdd={(event) => transition(CREATE)} />}

      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={(event) => transition(CONFIRM)}
          onEdit={(event) => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={(event) => back()} //use to be transition(SHOW)
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={edit}
          onCancel={(event) => transition(SHOW)} //use to be back()
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"There was an error during the Saving"}
          onClose={() => back()}

        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"There was an error during the Deleting"}
          onClose={() => transition(SHOW)}
        />
      )}
    </main>
  );
}
