import React from "react";
import { useHighlight } from "../hooks/useHighlight";

const ChildItem = props => {
  const child = props.child;
  const [handles] = useHighlight(
    props.timeOut,
    child.ref,
    props.timeOutHandles,
    props.initial,
    [child.props.children]
  );
  props.timeOutHandles = handles;
  return <></>;
};

export default ChildItem;

// TODO: https://inventingwithmonster.io/20190207-break-the-rules-of-react-hooks/
