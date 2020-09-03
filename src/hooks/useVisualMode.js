import React, { Fragment, useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace) {
    console.log("newMode", newMode)
    if (replace) {
      setMode(newMode)
    } else {
      setHistory(prev => ([...prev, newMode]))
      setMode(newMode)
    }
  }
  const back = function() {
    console.log("back history", history)
    console.log("back mode", mode)
      if (history.length > 0) {
        const newMode = history.pop()
        console.log("newMode", newMode)
        setMode(newMode)
        
      } else {
        setMode(mode)
      }
    }

  return { mode, transition, back };
}

