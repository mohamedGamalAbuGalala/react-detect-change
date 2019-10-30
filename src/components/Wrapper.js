import React from "react";
import { useEffect, useRef } from "react";
import { useHighlight } from "../hooks/useHighlight";

let timeOutHandles = Array(4).fill();

const Wrapper = props => {
  const isInitialMount = useRef(true);

  const [handles1] = useHighlight(
    props.timeOut,
    props.children[0].ref,
    timeOutHandles[0],
    isInitialMount.current,
    [props.children[0].props.children]
  );
  timeOutHandles[0] = handles1;

  const [handles2] = useHighlight(
    props.timeOut,
    props.children[1].ref,
    timeOutHandles[1],
    isInitialMount.current,
    [props.children[1].props.children]
  );
  timeOutHandles[1] = handles2;

  const [handles3] = useHighlight(
    props.timeOut,
    props.children[2].ref,
    timeOutHandles[2],
    isInitialMount.current,
    [props.children[2].props.children]
  );
  timeOutHandles[2] = handles3;

  const [handles4] = useHighlight(
    props.timeOut,
    props.children[3].ref,
    timeOutHandles[3],
    isInitialMount.current,
    [props.children[3].props.children]
  );
  timeOutHandles[3] = handles4;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      timeOutHandles = Array(props.children.length).fill();
      console.log(props.children);
    }
  }, [props.children]);

  return <>{props.children}</>;
};

export default Wrapper;

/**
 * import React from "react";
import { useEffect, useRef } from "react";
import { useHighlight } from "../hooks/useHighlight";

let timeOutHandles = Array(4).fill();

const Wrapper = props => {
  const isInitialMount = useRef(true);

  for (let i = 0; i < props.children.length; i++) {
    const child = props.children[i];
    const [handles] = useHighlight(
      props.timeOut,
      child.ref,
      timeOutHandles[i],
      isInitialMount.current,
      [child.props.children]
    );
    timeOutHandles[0] = handles;
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      timeOutHandles = Array(props.children.length).fill();
      // console.log(props.children);
    }
  }, [props.children]);

  return <>{props.children}</>;
};

export default Wrapper;

// const [handles2] = useHighlight(
//   props.timeOut,
//   props.children[1].ref,
//   timeOutHandles[1],
//   isInitialMount.current,
//   [props.children[1].props.children]
// );
// timeOutHandles[1] = handles2;

// const [handles3] = useHighlight(
//   props.timeOut,
//   props.children[2].ref,
//   timeOutHandles[2],
//   isInitialMount.current,
//   [props.children[2].props.children]
// );
// timeOutHandles[2] = handles3;

// const [handles4] = useHighlight(
//   props.timeOut,
//   props.children[3].ref,
//   timeOutHandles[3],
//   isInitialMount.current,
//   [props.children[3].props.children]
// );
// timeOutHandles[3] = handles4;

*/
