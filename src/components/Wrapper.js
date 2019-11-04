import React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import ChildItem from './ChildItem';

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
  const getValidChildren = useCallback(cur => {
    const children = cur.props.children;
    if (Array.isArray(children))
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (typeof child === 'object') getValidChildren(child);
        else if (child.toString().trim().length) {
          // eslint-disable-next-line no-loop-func
          setValidChildren(_c => {
            if (_c) return [..._c, cur];
            return [cur];
          });
          // console.log(cur, child);
        }
      }
    else if (typeof children === 'object') {
      cur = children;
      setValidChildren(_c => {
        if (_c) return [..._c, cur];
        return [cur];
      });
      // console.log('+++', cur, Array.isArray(cur.props.children) ? cur.props.children[0] : cur.props.children);
    } else if (children.toString().trim().length) {
      setValidChildren(_c => {
        if (_c) return [..._c, cur];
        return [cur];
      });
      // console.log('***', cur, children);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    setValidChildren(_c => []);

    getValidChildren({ props: { children: props.children } });

    setValidChildren(_c => _c.filter(c => c));

    // console.log(props.children);
  }, [getValidChildren, props.children]);

  useEffect(() => {
    timeOutHandles = Array(validChildren.length).fill();
    // console.log(validChildren);
  }, [validChildren.length]);

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
