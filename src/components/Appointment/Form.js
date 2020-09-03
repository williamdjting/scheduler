import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
export default function Form(props) {
  const [name, setName] = React.useState(props.name || "");
  const [interviewer, setInterviewer] = React.useState(
    props.interviewer || null
  );
  const [error, setError] = React.useState("");
  // const reset = () => {
  //   setName("");
  //   setInterviewer(null);
  // };
  const cancel = () => {
    console.log("cancel form", props)
    props.onCancel();
  };
  const validate = () => {
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Interviewer name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            data-testid="student-name-input"
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
          setInterviewer={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => validate(name, interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
