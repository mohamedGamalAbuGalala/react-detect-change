import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import ChildItem from './ChildItem';
// import ChildrenWithRef from "./ChildrenWithRef";
import uuidv4 from 'uuid/v4';

let timeOutHandles = [];

const updateTimeOut = (idx, value) => {
  timeOutHandles[idx] = value;
};

const Wrapper = props => {
  const [validChildren, setValidChildren] = useState([]);
  const [childrenWithRef, setChildrenWithRef] = useState([]);

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
      getValidChildren(children);
      // console.log('+++', cur, Array.isArray(cur.props.children) ? cur.props.children[0] : cur.props.children);
    } else if (children.toString().trim().length) {
      setValidChildren(_c => {
        if (_c) return [..._c, cur];
        return [cur];
      });
      // console.log('***', cur, children);
    }
  }, []);

  const getChildrenWithRefs = cur => {
    const newChildren = [];
    for (let i = 0; i < cur.length; i++) {
      const child = cur[i];
      if (typeof child === 'object') {
        let newChild = React.cloneElement(child, {
          key: uuidv4(),
          ref: React.createRef()
        });
        if (Array.isArray(newChild.props.children)) {
          newChild = {
            ...newChild,
            props: {
              ...newChild.props,
              children: getChildrenWithRefs(newChild.props.children)
            }
          };
          newChildren.push(newChild);
        } else if (typeof newChild.props.children === 'object') {
          newChild = {
            ...newChild,
            props: {
              ...newChild.props,
              children: React.cloneElement(newChild.props.children, {
                ref: React.createRef()
              })
            }
          };
          newChildren.push(newChild);
        } else {
          newChildren.push(newChild);
        }
      } else {
        newChildren.push(child);
        // console.log("not obj", cur);
      }
    }
    return newChildren;
  };

  useEffect(() => {
    setChildrenWithRef(_c => {
      const getNewChildren = getChildrenWithRefs(props.children);
      return getNewChildren;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  useEffect(() => {
    // console.log("--", childrenWithRef);

    setValidChildren(_c => []);

    getValidChildren({ props: { children: childrenWithRef } });

    setValidChildren(_c => _c.filter(c => c));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenWithRef]);

  useEffect(() => {
    timeOutHandles = Array(validChildren.length).fill();
    // console.log("fdjhsdjk", validChildren);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      {childrenWithRef}
    </>
  );
};

export default Wrapper;
