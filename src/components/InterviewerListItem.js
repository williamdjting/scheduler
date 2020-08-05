import React from "react";

import "components/InterviewerListItem.scss";

let classNames = require('classnames');



// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };



export default function InterviewerListItem(props) {
  const interviewClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

// storiesOf("InterviewerListItem", module)
//   .addParameters({
//     backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
//   })
//   .add("Unselected", () => (
//     <InterviewerListItem
//       id={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}
//     />
//   ))
//   .add("Selected", () => (
//     <InterviewerListItem
//       id={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}
//       selected
//     />
//   ))
//   .add("Clickable", () => (
//     <InterviewerListItem
//       id={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}
//       setInterviewer={action("setInterviewer")}
//     />
//   ));