
const getAppointmentsForDay = function(state, day) {

  const result = [];

  state.days.forEach(dayObj => {
    if (dayObj.name === day) {
      
      dayObj.appointments.forEach((appointment) => {
        result.push(state.appointments[appointment])
      })
    }
  })
  return result;
 
};

const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {};
  result.student = interview.student;
  result.interviewer = state.interviewers[interview.interviewer];

  return result;

};

const getInterviewersForDay = function(state, day) {
  const specificDay = state.days.filter((element) => day === element.name);


  const result = [];
  specificDay.forEach(element => {
    element.appointments.forEach((e) => {
      result.push(state.appointments[e]);

    })
  });
  return result;
}

export { getAppointmentsForDay, getInterview }