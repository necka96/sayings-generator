import { useState } from "react";
import "./App.css";
import Saying from "./Components/Saying";
import ThemeSwitcher from "./Components/ThemeSwitcher";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Saying />
      <ThemeSwitcher />
    </>
  );
}

export default App;
