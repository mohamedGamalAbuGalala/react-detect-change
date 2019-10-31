import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import ChildItem from "./ChildItem";

let timeOutHandles = [];

const updateTimeOut = (idx, value) => {
  timeOutHandles[idx] = value;
};

const Wrapper = props => {
  const [validChildren, setValidChildren] = useState([]);
  const isInitialMount = useRef(true);

  //
  //
  //
  // get tree dfs
  const getValidChildren = useCallback(
    cur => {
      const childs = cur.props.children;
      if (typeof childs === "object")
        for (let i = 0; i < childs.length; i++) {
          const child = childs[i];
          if (typeof child === "object") getValidChildren(child);
          else if (child.toString().trim().length) {
            setValidChildren([...validChildren, cur]);
            console.log(cur, child);
          }
        }
      else if (childs.toString().trim().length) {
        setValidChildren([...validChildren, cur]);
        console.log("***", cur, childs);
      }
    },
    [validChildren]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      getValidChildren({ props: { children: props.children } });

      setValidChildren(validChildren.filter(c => c));

      console.log(props.children);
      isInitialMount.current = false;
      timeOutHandles = Array(validChildren.length).fill();
    }
  }, [getValidChildren, props.children, validChildren]);

  return (
    <>
      {validChildren.map((child, idx) => (
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
