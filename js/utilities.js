 // Ao carregar a página, aplica o tema salvo
 document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const themeIcon = document.getElementById("theme-icon");
    document.body.setAttribute("data-theme", savedTheme);
    themeIcon.className = savedTheme === "dark" ? "bi bi-sun" : "bi bi-moon";
  });

  // Alterna o tema e salva no localStorage
  function toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme");
    const themeIcon = document.getElementById("theme-icon");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeIcon.className = newTheme === "dark" ? "bi bi-sun" : "bi bi-moon";
  }