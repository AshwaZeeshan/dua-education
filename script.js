const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");

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
