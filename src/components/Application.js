import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "./Appointment"
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application() {

  //combin states in an object
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments:{},
    interviewers :{}
  });

  
  //define a function to set day 
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    
    //define functions to set days, set appointments and set interviewers
    const setDays = days => setState(prev => ({ ...prev, days }));;
    const setAppointments = appointments=> setState(prev => ({ ...prev, appointments }));;
    const setInterviewers = interviewers=> setState(prev => ({ ...prev, interviewers }));;
    
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get(" http://localhost:8001/api/appointments"),
      axios.get(" http://localhost:8001/api/interviewers")      
    ])
    .then((all) => {
      setDays(all[0].data);
      setAppointments(all[1].data);
      setInterviewers(all[2].data);
    })
    
    
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state,state.day);


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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return <Appointment key={appointment.id} {...appointment} />
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
