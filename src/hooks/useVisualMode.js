import React, { Fragment, useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace) {
    if (replace) {
      setMode(newMode)
    } else {
      setHistory([...history, mode])
      setMode(newMode)
    }
  }
  const back = function() {
      if (history.length > 1) {
        setMode(history.pop())
      } else {
        setMode(mode)
      }
    }

  return { mode, transition, back };
}

