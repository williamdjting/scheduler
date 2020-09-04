import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import "components/Application.scss";

import { getAppointmentsForDay } from "helpers/selectors";

import { getInterviewersForDay } from "helpers/selectors";

import { getInterview } from "helpers/selectors";

import DayList from "components/DayList";

import Appointment from "components/Appointment/index.js"

import useApplicationData from "hooks/useApplicationData.js"


export default function Application(props) {
  //the various states that are stored - taken from useApplicationData function
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  } = useApplicationData();


  const appointmentObjects = getAppointmentsForDay(state, state.day);
  //uses getAppointmentsForDay function to hold state

  const interviewers = getInterviewersForDay(state, state.day);
    //uses getInterviewersForDay function to hold state

  const schedule = appointmentObjects.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      //passes relevant api data to the appointment for rendering
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      editInterview={editInterview}
    />

    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}

