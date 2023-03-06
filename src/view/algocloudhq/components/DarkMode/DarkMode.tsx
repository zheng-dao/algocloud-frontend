import "./DarkMode.css";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from 'src/modules/settings/settingsActions';
import selectors from 'src/modules/settings/settingsSelectors';
import SettingsService from 'src/modules/settings/settingsService';

const DarkMode = () => {
    const dispatch = useDispatch();
    const settings = useSelector(selectors.selectSettings);

    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        // if (!settings) {
        //     localStorage.setItem("theme", "dark");
        // }
    }, [])

    const setDark = () => {
        localStorage.setItem("theme", "dark");
        // document.documentElement.setAttribute("data-theme", "dark");
    };

    const setLight = () => {
        localStorage.setItem("theme", "light");
        // document.documentElement.setAttribute("data-theme", "light");
    };

    // const storedTheme = localStorage.getItem("theme");

    // const prefersDark =
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches;

    // const defaultDark =
    //     storedTheme === "dark" || (storedTheme === null && prefersDark);

    // if (defaultDark) {
    //     setDark();
    // }

    const toggleTheme = (e) => {
        // let theme = ''
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light" || storedTheme === null) {
            // theme = 'default';
            setDark();
            setTheme("dark")
        } else {
            // theme = 'light';
            setLight();
            setTheme("light")
        }
        // var values = {
        //     backgroundImages: [],
        //     logos: [],
        //     theme: theme
        // }
        // dispatch(actions.doSave(values));
        SettingsService.applyThemeFromTenant();
    };
    return (
        <div className="toggle-theme-wrapper">
            <label className="dropdown-item" htmlFor="checkbox">
                {
                    theme === "dark" ? <div className="lightmode-toggle" onClick={toggleTheme}>
                        <i id="sun" className="fas fa-sun"></i> Lightmode
                    </div> : <div className="darkmode-toggle" onClick={toggleTheme}>
                        <i id="moon" className="fas fa-moon"></i> Darkmode
                    </div>
                }
                {/* <input
                    type="checkbox"
                    id="checkbox"
                    onChange={toggleTheme}
                    // defaultChecked={defaultDark}
                /> */}
            </label>
        </div>
    );
};

export default DarkMode;