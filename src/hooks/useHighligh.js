import { useEffect, useState } from "react";

export const useHighligh = (ref, handle, initialRef, deps = []) => {
  const [initial, setInitial] = useState(initialRef);
  const [currentHandle, setCurrentHandles] = useState(handle);
  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      // console.log("renders", currentHandle);

      clearTimeout(currentHandle);
      // console.log(currentHandle, "currentHandle cleared");

      ref.current.style.background = "#fff";
      ref.current.style.background = "#f8ffb4";

      const timeOutHandle = setTimeout(() => {
        // console.log(currentHandle, "currentHandle cleared after 3000ms");
        ref.current.style.background = "#fff";
      }, 3000);
      setCurrentHandles(timeOutHandle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [currentHandle, initial];
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
