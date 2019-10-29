import React, { useRef } from "react";
import { useForm } from "./hooks/useForm";
import { useHighligh } from "./hooks/useHighligh";
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

const timeOutHandles = Array(4).fill();

function App() {
  const [state, handleChange] = useForm({
    result1: "res 1",
    result2: "res 2",
    result3: "res 3",
    result4: "res 4"
  });

  const pRef1 = useRef();
  const pRef2 = useRef();
  const pRef3 = useRef();
  const pRef4 = useRef();

  //TODO: should add rest of logic inside a wrapper

  const isInitialMount = useRef({ _1: true, _2: true, _3: true, _4: true });

  const [handles1, initial1] = useHighligh(
    pRef1,
    timeOutHandles[0],
    isInitialMount.current._1,
    [state.result1]
  );
  isInitialMount.current._1 = initial1;
  timeOutHandles[0] = handles1;

  const [handles2, initial2] = useHighligh(
    pRef2,
    timeOutHandles[1],
    isInitialMount.current._2,
    [state.result2]
  );
  isInitialMount.current._2 = initial2;
  timeOutHandles[1] = handles2;

  const [handles3, initial3] = useHighligh(
    pRef3,
    timeOutHandles[2],
    isInitialMount.current._3,
    [state.result3]
  );
  isInitialMount.current._3 = initial3;
  timeOutHandles[2] = handles3;

  const [handles4, initial4] = useHighligh(
    pRef4,
    timeOutHandles[3],
    isInitialMount.current._4,
    [state.result4]
  );
  isInitialMount.current._4 = initial4;
  timeOutHandles[3] = handles4;

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
