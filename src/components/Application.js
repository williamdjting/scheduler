import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment/index.js"

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "4pm",
  },
  {
    id: 5,
    time: "6pm",
    interview: {
      student: "Cohana Roy",
      interviewer: {
        id: 2,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('/api/days')
      .then(response => {
        // console.log(response.data.results);
        setDays(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);


  const schedule = appointments.map((appointment) => {
    return (
      // <Appointment
      // key={appointment.id}
      // id={appointment.id}
      // interviewers={interviewers}
      // time={appointment.time}
      // interview={appointment.interview}
      // />
      <Appointment key={appointment.id} {...appointment} />
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
            days={days}
            day={day}
            setDay={setDay}
            //setDays={setDays}
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

