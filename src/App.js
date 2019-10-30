import React, { useRef } from "react";
import { useForm } from "./hooks/useForm";
import Wrapper from "./components/Wrapper";
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

  return (
    <div className="App">
      <Wrapper timeOut={2000}>
        <p ref={pRef1}>{state.result1}</p>
        <p ref={pRef2}>{state.result2}</p>
        <p ref={pRef3}>{state.result3}</p>
        <p ref={pRef4}>{state.result4}</p>
      </Wrapper>

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
