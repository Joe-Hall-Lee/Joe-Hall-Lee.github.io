/*!
 * Dark Mode Switch v1.0.1 (https://github.com/coliff/dark-mode-switch)
 * Copyright 2021 C.Oliff
 * Licensed under MIT (https://github.com/coliff/dark-mode-switch/blob/main/LICENSE)
 */

var darkSwitch = document.getElementById("darkSwitch");

(function () {
    const savedTheme = localStorage.getItem("darkSwitch");
    let theme;
    if (savedTheme === "dark" || savedTheme === "light") {
        theme = savedTheme;
    } else {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
    if (document.body) {
        document.body.setAttribute("data-theme", theme);
    }
})();

window.addEventListener("DOMContentLoaded", function () {
    darkSwitch = document.getElementById("darkSwitch");
    if (darkSwitch) {
        initTheme();
        darkSwitch.addEventListener("change", resetTheme);
        // 监听系统主题变化
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
            if (!localStorage.getItem("darkSwitch")) {
                const theme = e.matches ? "dark" : "light";
                document.documentElement.setAttribute("data-theme", theme);
                document.body.setAttribute("data-theme", theme);
                darkSwitch.checked = theme === "dark";
            }
        });
    }
});
/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initTheme() {
    const savedTheme = localStorage.getItem("darkSwitch");
    const theme =
        savedTheme === "dark" || savedTheme === "light"
            ? savedTheme
            : window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light";

    darkSwitch.checked = theme === "dark";
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
}

/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */
function resetTheme() {
    if (darkSwitch.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("darkSwitch", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("darkSwitch", "light");
    }
    darkSwitch.blur();
}
