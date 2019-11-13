import React, { useEffect, useState } from 'react';
import uuidv4 from 'uuid/v4';

const ChildrenWithRef = ({ children }) => {
  const [childrenWithRef, setChildrenWithRef] = useState([]);

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
      const getNewChildren = getChildrenWithRefs(children);
      console.log('--', getNewChildren);
      return getNewChildren;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return childrenWithRef;
};

export default ChildrenWithRef;
