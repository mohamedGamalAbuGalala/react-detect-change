import React, { useEffect, useRef } from "react";
import { useForm } from "./hooks/useForm";
import "./App.css";

/**
 *
    <Wrapper>
    <p>{this.state.result1}</p>
    <p>{this.state.result2}</p>
    <p>{this.state.result3}</p>
    <p>{this.state.result4}</p>
    </Wrappr>
    In the code above you get a Wrapper component and you need to detect which child of the 4 paragraphs inside it has been updated using the state,
    and make the color of the text red for 3 seconds and then turn it back to the original color, keep in mind to have it in the best performance possible.
    This is a quick problem to resolve before getting involved to the big one.
    *
    */

// TODO: check useMeasure using useLayoutEffect

const timeOutHandles = [[], [], [], []];

function App() {
  const [state, handleChange] = useForm({
    result1: "res 1",
    result2: "res 2",
    result3: "res 3",
    result4: "res 4"
  });
  const isInitialMount = useRef({ _1: true, _2: true, _3: true, _4: true });

  const pRef1 = useRef();
  const pRef2 = useRef();
  const pRef3 = useRef();
  const pRef4 = useRef();

  useEffect(() => {
    if (isInitialMount.current._1) {
      isInitialMount.current._1 = false;
    } else {
      timeOutHandles[0].forEach(handle => {
        clearInterval(handle);
      });
      pRef1.current.style = { backgroundColor: "#fff" };
      pRef1.current.style.background = "yellow";
      const handle = setTimeout(() => {
        pRef1.current.style = { backgroundColor: "#fff" };
      }, 1000);
      timeOutHandles[0].push(handle);
    }
  }, [state.result1]);

  useEffect(() => {
    if (isInitialMount.current._2) {
      isInitialMount.current._2 = false;
    } else {
      timeOutHandles[1].forEach(handle => {
        clearInterval(handle);
      });
      pRef2.current.style = { backgroundColor: "#fff" };
      pRef2.current.style.background = "yellow";
      const handle = setTimeout(() => {
        pRef2.current.style = { backgroundColor: "#fff" };
      }, 1000);
      timeOutHandles[1].push(handle);
    }
  }, [state.result2]);

  useEffect(() => {
    if (isInitialMount.current._3) {
      isInitialMount.current._3 = false;
    } else {
      timeOutHandles[2].forEach(handle => {
        clearInterval(handle);
      });
      pRef3.current.style = { backgroundColor: "#fff" };
      pRef3.current.style.background = "yellow";
      const handle = setTimeout(() => {
        pRef3.current.style = { backgroundColor: "#fff" };
      }, 1000);
      timeOutHandles[2].push(handle);
    }
  }, [state.result3]);

  useEffect(() => {
    if (isInitialMount.current._4) {
      isInitialMount.current._4 = false;
    } else {
      timeOutHandles[3].forEach(handle => {
        clearInterval(handle);
      });
      pRef4.current.style = { backgroundColor: "#fff" };
      pRef4.current.style.background = "yellow";
      const handle = setTimeout(() => {
        pRef4.current.style = { backgroundColor: "#fff" };
      }, 1000);
      timeOutHandles[3].push(handle);
    }
  }, [state.result4]);

  return (
    <div className="App">
      <p ref={pRef1}>{state.result1}</p>
      <p ref={pRef2}>{state.result2}</p>
      <p ref={pRef3}>{state.result3}</p>
      <p ref={pRef4}>{state.result4}</p>

      <input
        type="text"
        name="result1"
        id="result_1"
        value={state.result1}
        onChange={handleChange}
      />
      <input
        type="text"
        name="result2"
        id="result_2"
        value={state.result2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="result3"
        id="result_3"
        value={state.result3}
        onChange={handleChange}
      />
      <input
        type="text"
        name="result4"
        id="result_4"
        value={state.result4}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
