import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {

    setMode(newMode);

    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    }
    else {
      setHistory(prev => [...prev, newMode]);
    }
    // console.log(history);  
  }

  const back = function() {
    if (history.length >= 2) {
      // const copy = [...history];
      // copy.pop();
      // setHistory(copy);
      // setMode(copy[copy.length - 1]);

      setHistory(prev => {

        //define a templete const to store prev.slice(0, prev.length - 1)
        //because setState is async, so we need this templete to set mode, before set history
        const historyBack = prev.slice(0, prev.length - 1)

        setMode(historyBack[historyBack.length - 1])

        return historyBack;

      })
      // console.log("prev:",prev);
      // console.log("slice",[...prev.slice(0, prev.length-1)]);
      // return [...prev.slice(0, prev.length-1)];
      // return ["FIRST", "SECOND"]
      // console.log(mode);
      // console.log("after set history:", history);

    }
  }
  return { mode, transition, back, history }
}
