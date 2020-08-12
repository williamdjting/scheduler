import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';



export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return (axios.delete(`/api/appointments/${id}`)
          .then((response) => {
            console.log(response)
          })
    )
  }

  const bookInterview = function(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return (axios.put(`/api/appointments/${id}`, 
        {interview})
        
          .then((response) => {
            console.log(response)
          })
    )
  }


  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),
    ])

      .then((all) => {
        console.log('all', all)
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
  
}