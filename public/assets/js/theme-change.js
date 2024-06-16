function ThemeToggle() {
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
      document.querySelector("#icon-site").src = "./assets/img/icon-dark.png";
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
    scrollNavSets();
  }

  toggleSwitch.addEventListener("change", switchTheme, false);
}
