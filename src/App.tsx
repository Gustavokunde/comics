import React from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const changeMode = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    if(theme==='dark') document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.setAttribute("data-theme", "dark");
  };

  return (
    <BrowserRouter>
      <div id="switch">
        <span>Dark | Light mode</span>
        <input id="toggle"type="checkbox" name="theme" onChange={changeMode} />
        <label htmlFor="toggle">Toggle</label>
      </div>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
