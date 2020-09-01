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

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const appointmentObjects = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointmentObjects.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      // day={state.day}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
          // setDays={setDays}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Schedule" activity. */}
        {schedule}
      </section>
    </main>
  );
}

