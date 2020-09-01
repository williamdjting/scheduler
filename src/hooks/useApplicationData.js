import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';



export default function useApplicationData() {
  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const finder = function(day) {
    const dayIndex = state.days.findIndex(day => day.name === state.day)
    return dayIndex
  }


  const cancelInterview = function(id) {
    const dayIndex = finder();
    const days = [...state.days];
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    days[dayIndex].spots+=1;

    
    return (axios.delete(`/api/appointments/${id}`)
          .then((response) => {
            setState({
              ...state,
              appointments,
              days
            });
            // console.log(response)
          })
    )
  }

  const bookInterview = function(id, interview) {
    const dayIndex = finder();
    const days = [...state.days];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    days[dayIndex].spots-=1;

    
    return (axios.put(`/api/appointments/${id}`, 
        {interview})
        
          .then((response) => {
            // console.log(response)
            setState({
              ...state,
              appointments, 
              days
            });
          })
          
    )
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      (axios.get('/api/days')),
      (axios.get('/api/appointments')),
      (axios.get('/api/interviewers')),
    ])

      .then((all) => {
        // console.log('all', all)
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