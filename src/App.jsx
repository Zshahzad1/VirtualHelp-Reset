import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Reset from "./pages/Reset";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Reset />
    </>
  );
}

export default App;
