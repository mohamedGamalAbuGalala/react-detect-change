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
    result4: "res 4",
    children0: "c0",
    children1: "c1",
    children2: "c2",
    children3: "c3",
    children4: "c4"
  });

  const pRef1 = useRef();
  const pRef2 = useRef();
  const pRef3 = useRef();
  const pRef4 = useRef();

  const cRef0 = useRef();
  const cRef1 = useRef();
  const cRef2 = useRef();
  const cRef3 = useRef();
  const cRef4 = useRef();

  return (
    <div className="App">
      <Wrapper timeOut={2000}>
        <div>
          <span ref={pRef1}>{state.result1}</span>
          {"  "}{" "}
          <div style={{ marginLeft: "50px" }}>
            <span ref={cRef0}>{state.children0}</span>
            <div style={{ marginLeft: "75px" }}>
              <span ref={cRef1}>{state.children1} </span>
              <div style={{ marginLeft: "100px" }}>
                <span ref={cRef2}>{state.children2} </span>
                <div style={{ marginLeft: "125px" }}>
                  <span ref={cRef3}>{state.children3} </span>
                  <div style={{ marginLeft: "150px" }}>
                    <span ref={cRef4}>{state.children4} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p ref={pRef2}>{state.result2}</p>
        <p ref={pRef3}>{state.result3}</p>
        <p ref={pRef4}>{state.result4}</p>
      </Wrapper>

      <input
        type="text"
        name="result1"
        value={state.result1}
        onChange={handleChange}
      />
      <input
        type="text"
        name="result2"
        value={state.result2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="result3"
        value={state.result3}
        onChange={handleChange}
      />
      <input
        type="text"
        name="result4"
        value={state.result4}
        onChange={handleChange}
      />
      <br></br>
      <br></br>

      <input
        type="text"
        name="children0"
        value={state.children0}
        onChange={handleChange}
      />

      <input
        type="text"
        name="children1"
        value={state.children1}
        onChange={handleChange}
      />

      <input
        type="text"
        name="children2"
        value={state.children2}
        onChange={handleChange}
      />

      <input
        type="text"
        name="children3"
        value={state.children3}
        onChange={handleChange}
      />

      <input
        type="text"
        name="children4"
        value={state.children4}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
