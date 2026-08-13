const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");
const courseDropdown = document.querySelector(".nav-dropdown");
const courseDropbutton = document.querySelector(".nav-dropbutton");
const topLinks = document.querySelectorAll('a[href="#page-top"]');

const syncViewportHeight = () => {
  const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty("--viewport-h", `${Math.round(height)}px`);
};

syncViewportHeight();
window.addEventListener("resize", syncViewportHeight);
window.visualViewport?.addEventListener("resize", syncViewportHeight);

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (courseDropdown && courseDropbutton) {
  const setDropdownOpen = (open) => {
    courseDropdown.classList.toggle("open", open);
    courseDropbutton.setAttribute("aria-expanded", String(open));
  };

  courseDropbutton.addEventListener("click", (event) => {
    event.stopPropagation();
    setDropdownOpen(!courseDropdown.classList.contains("open"));
  });

  document.addEventListener("click", () => setDropdownOpen(false));
  courseDropdown.addEventListener("click", (event) => event.stopPropagation());
}

topLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
});

const cleanText = (value) => value.replace(/[<>]/g, "").trim();

document.querySelectorAll(".secure-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = form.querySelector(".form-status");
    const fields = [...form.querySelectorAll("input, select, textarea")];
    let isValid = true;

    fields.forEach((field) => {
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.value = cleanText(field.value);
      }

      if (!field.checkValidity()) {
        isValid = false;
      }
    });

    if (!isValid) {
      form.reportValidity();
      if (status) {
        status.textContent = "Please complete the required fields correctly.";
      }
      return;
    }

    form.reset();
    if (status) {
      status.textContent = "Thank you. Your message is ready for secure backend connection.";
    }
  });
});
