import React from "react"
import Button from "components/Button"
import InterviewerList from "components/InterviewerList"
export default function Form(props) {
  const [name, setName] = React.useState(props.name || null);
  const [interviewer, setInterviewer] = React.useState(props.interviewer || null);
  const [error, setError] = React.useState("");
  const reset = () => {setName(""); setInterviewer(null);};
  const cancel = () => {props.onCancel(reset())};
  const validate = (name, interviewer) => {
    if (name === "") {
      setError("Please enter your name");
      return;
    } else {
      setError("");
      props.onSave(name, interviewer);
    }
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            /*
              This must be a controlled component
            */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
        interviewers={props.interviewers} 
        interviewer={interviewer} 
        setInterviewer={(event) => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
              <Button onClick={cancel} danger>Cancel</Button>
              <Button onClick={() => validate(name, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}

// import React, { useState } from 'react'

// import InterviewerList from "components/InterviewerList";

// import Button from "components/Button";


// export default function Form(props) {
//   const [name, setName] = useState(props.name || "");
//   const [interviewer, setInterviewer] = useState(props.interviewer || null);
//   const [error, setError] = React.useState("");

//   const reset = function() {
//     setName("");
//     setInterviewer(null);
//   }

//   const cancel = function() {
//     props.onCancel(reset())
//   }

//   const validate = () => {
//     if (name === "") {
//       setError("Please enter your name");
//       return;
//     } else {
//       setError("");
//       props.onSave(name, interviewer)
//     }
//   }

  
//   return (
//     <main className="appointment__card appointment__card--create">
//       <section className="appointment__card-left">
//         <form autoComplete="off" onSubmit={event => event.preventDefault()}>
//           <input
//             className="appointment__create-input text--semi-bold"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//             // name={props.name}
//             type="text"
//             placeholder="Enter Student Name"
//           /*
//             This must be a controlled component
//           */
//           />
//         </form>
//         <section className="appointment__validation">{error}</section>
//         <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(event) => setInterviewer(event)} />
//       </section>
//       <section className="appointment__card-right">
//         <section className="appointment__actions">
//           <Button danger onClick={cancel()}>Cancel</Button>
//           <Button onClick={validate} confirm>Save</Button>
//         </section>
//       </section>
//     </main>
//   );
// }

