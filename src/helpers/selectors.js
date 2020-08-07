export function getAppointmentsForDay(state, day) {
  // console.log('State in selector fn: ', state)
  const filteredDays = state.days.filter(aptDay => aptDay.name === day)
  // console.log('filtered days[0]', filteredDays[0].appointments)
  const filteredAppointments = [];

  for (const appointment in state.appointments) {
    // console.log('state.appointments[appointment]', state.appointments[appointment].id)

    if (filteredDays[0]) {
      if (filteredDays[0].appointments.includes(state.appointments[appointment].id)) {
        filteredAppointments.push(state.appointments[appointment])
      }
    }
  }
  return filteredAppointments
};

// export function getAppointmentsForDay(state, day) {
//   for (let i in state.days) {
//     if (state.days[i].name === day) {
//       const findObj = state.days[i].filter(stateDay => state.appointments.id === stateDay.id) 
//       return findObj
//     }
//   }
//   // const findObj = state.days.filter(stateDay => stateDay.name === day);
//   // return findObj

// }




// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }



