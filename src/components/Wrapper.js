import React from "react";
import { useEffect, useRef } from "react";
// , useState
import ChildItem from "./ChildItem";

let timeOutHandles = [];

const updateTimeOut = (idx, value) => {
  timeOutHandles[idx] = value;
};

const Wrapper = props => {
  // const [validChildren, setValidChildren] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      //
      //
      //
      // get tree dfs
      const getValidChildren = cur => {
        const childs = cur.props.children;
        if (typeof childs === "object")
          for (let i = 0; i < childs.length; i++) {
            const child = childs[i];
            if (typeof child === "object") getValidChildren(child);
            else if (child.toString().trim().length) console.log(child);
          }
        else if (childs.toString().trim().length) console.log(childs);
      };

      getValidChildren({ props: { children: props.children } });

      console.log(props.children);
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
