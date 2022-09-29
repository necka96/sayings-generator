import React, { useEffect, useState } from "react";
import { GiMoon } from "react-icons/gi";
import { HiColorSwatch, HiOutlineSun } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import useLocalStorage from "./../Helpers/useLocalStorage";
import "./ThemeSwitcher.scss";
const ThemeSwitcher = () => {
  const [isColorPicking, setIsColorPicking] = useState(false);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "sayings-theme",
    defaultDark ? "dark" : "light"
  );
  const [hue, setHue] = useLocalStorage("sayings-color", "240");
  const handleThemeBtn = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.style.setProperty("--_hue", hue);
  }, [hue]);
  return (
    <div
      className='wrapper'
      style={{
        backgroundColor: isColorPicking
          ? "hsl(var(--muted) / .6)"
          : "transparent",
      }}
    >
      {isColorPicking ? (
        <>
          <button
            className='btn close'
            aria-label='close color picking mode'
            onClick={() => setIsColorPicking(false)}
          >
            <IoMdClose />
          </button>
          <input
            type='range'
            className='picker'
            aria-label='change color theam slide'
            min='0'
            max='360'
            value={hue}
            onInput={(e) => setHue(e.target.value)}
          />
        </>
      ) : (
        <div className='btns'>
          <button
            className='btn'
            aria-label={`change theam to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            role='switch'
            onClick={handleThemeBtn}
          >
            {" "}
            {theme === "dark" ? <HiOutlineSun /> : <GiMoon />}
          </button>
          <button
            className='btn'
            aria-label='enable color picking mode'
            onClick={() => setIsColorPicking(true)}
          >
            <HiColorSwatch />
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
