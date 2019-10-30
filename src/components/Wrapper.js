import React from "react";
import { useEffect, useRef } from "react";
import ChildItem from "./ChildItem";

let timeOutHandles = [];

const updateTimeOut = (idx, value) => {
  timeOutHandles[idx] = value;
};

const Wrapper = props => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      timeOutHandles = Array(props.children.length).fill();
    }
  }, [props.children]);

  return (
    <>
      {props.children.map((child, idx) => (
        <ChildItem
          key={idx}
          {...props}
          idx={idx}
          updateTimeOut={updateTimeOut}
          timeOutHandles={timeOutHandles[idx]}
          child={child}
        ></ChildItem>
      ))}

      {props.children}
    </>
  );
};

export default Wrapper;
