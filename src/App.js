import Poke from "./Poke";
import Example from "./Example.js";
import { useEffect, useState } from "react";

export default function App() {
  const [color2, setColor2] = useState("pokeball");
  const [color3, setColor3] = useState("greatball");
  const [color4, setColor4] = useState("ultraball");
  const updateColor2 = (newValue) => {
    setColor2(newValue);
  };
  const updateColor3 = (newValue) => {
    setColor3(newValue);
  };
  const updateColor4 = (newValue) => {
    setColor4(newValue);
  };

  const [typeBall1, setTypeBall1] = useState("healball");
  const [typeBall2, setTypeBall2] = useState("fastball");
  const updateTypeBall1 = (newValue) => {
    setTypeBall1(newValue);
  }
  const updateTypeBall2 = (newValue) => {
    setTypeBall2(newValue);
  }
  return (
    <div className="App">
      <div className="poke">
        <Poke
          updateColor2={updateColor2}
          updateColor3={updateColor3}
          updateColor4={updateColor4}
          updateTypeBall1={updateTypeBall1}
          updateTypeBall2={updateTypeBall2}
        />
      </div>
      <div className="example">
        <Example dynamicContent={[color2, color3, color4, typeBall1, typeBall2]} />
      </div>
    </div>
  );
}
