export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(aptDay => aptDay.name === day)

  const filteredAppointments = [];

  for (const appointment in state.appointments) {


    if (filteredDays[0] && filteredDays[0].appointments.includes(state.appointments[appointment].id)) {
        filteredAppointments.push(state.appointments[appointment])
      }
  }
  return filteredAppointments
};

export function getInterview(state, interview) {


  if (!interview) {
    return null
  }
  const interviewData = {};
  interviewData['student'] = interview.student;
  interviewData['interviewer'] = {};
  const interviewerID = interview.interviewer;
  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interviewerID) {
      
      interviewData['interviewer'] = state.interviewers[interviewer];
    }
  }
  return interviewData
}


export function getInterviewersForDay(state, day) {

  const filteredDays = state.days.filter(aptDay => aptDay.name === day)

  const filteredInterviewers = [];

  for (const interviewer in state.interviewers) {


    if (filteredDays[0]) {
      if (filteredDays[0].interviewers.includes(state.interviewers[interviewer].id)) {
        filteredInterviewers.push(state.interviewers[interviewer])
      }
    }
  }
  return filteredInterviewers
};