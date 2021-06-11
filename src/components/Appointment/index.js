import React from "react";
import "./index.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  //save an interview 
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };  
    props.bookInterview(props.id,interview)
  }

  return <article className="appointment">
    <Header time={props.time} />

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode=== CREATE && <Form interviewers={props.interviewers} save={save} onCancel={()=>transition(EMPTY)}/>}

  </article>;
}

export default Appointment;

