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