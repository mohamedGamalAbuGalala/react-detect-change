import { useEffect, useState } from 'react';

export const useHighlight = (
  updateTimeOutFn,
  idx,
  timeOut,
  ref,
  handle,
  initialRef,
  deps = []
) => {
  // console.log('dsdddddddddd');
  const [currentHandle, setCurrentHandles] = useState(handle);
  useEffect(() => {
    if (!initialRef) {
      // console.log('highlight', currentHandle);

      if (currentHandle) {
        clearTimeout(currentHandle);
        // console.log(currentHandle, 'currentHandle cleared');
      }

      console.log(deps);
      if (!ref) return;

      ref.current.style.background = '#fff';
      ref.current.style.background = '#f8ffb4';

      const timeOutHandle = setTimeout(() => {
        if (ref.current) {
          // console.log(
          //   currentHandle,
          //   `currentHandle cleared after ${timeOut}ms`
          // );
          ref.current.style.background = '#fff';
        }
      }, timeOut);
      setCurrentHandles(timeOutHandle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  updateTimeOutFn(idx, currentHandle);
  return [currentHandle];
};

/**
 * import { useEffect, useState } from "react";

export const useHighligh = (ref, handles, initialRef, deps = []) => {
  const [initial, setInitial] = useState(initialRef);
  const [handleArr, setHandles] = useState(handles);
  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      console.log("renders", handleArr);

      handleArr.forEach(handle => {
        console.log(handle, "handle cleared");
        clearTimeout(handle);
      });
      setHandles([]);

      ref.current.style.background = "#fff";
      ref.current.style.background = "#f8ffb4";

      const handle = setTimeout(() => {
        console.log(handle, "handle cleared after 3000ms");
        ref.current.style.background = "#fff";
      }, 3000);
      console.log("*********", handle);
      setHandles(a => [...a, handle]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [handleArr, initial];
};

*/
