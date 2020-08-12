import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

import PropTypes from 'prop-types';

let classNames = require('classnames');




export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{props.name}</h4>
      <div className="interviewers__list">
      {/* {props.interviewers.map((interviewer, index) => ( //props looks its own props that get passed by the parent component from index.js line 130 to find the interviewers object and map parses thru it and the props on line 21 and 24 come from InterviewerListItem which is imported in on line 5
        <InterviewerListItem
          onClick={props.setInterviewer}
          avatar={interviewer.avatar}
          name={interviewer.name}
          selected={props.interviewer === index} />
        )
      )} */}
      {interviewers}
      </div>
    </section>
  )
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  setInterviewer: PropTypes.number,
  onChange: PropTypes.func.isRequired
};