export function useTheme() {
  const isDark = useState<boolean>("theme-is-dark", () => false);

  function applyTheme(dark: boolean) {
    isDark.value = dark;
    if (import.meta.client) {
      const root = document.documentElement;
      const body = document.body;
      if (dark) {
        root.classList.add("dark");
        body.classList.add("dark");
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        body.classList.remove("dark");
        root.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
        localStorage.setItem("theme", "light");
      }
    }
  }

  function toggleTheme() {
    applyTheme(!isDark.value);
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        applyTheme(true);
      } else {
        // Light mode default always
        applyTheme(false);
      }
    }
  }

  return {
    isDark,
    toggleTheme,
    initTheme,
    applyTheme,
  };
}
