const dropdownItems = document.querySelectorAll("[data-dropdown]");

if (
  window.matchMedia("(max-width: 800px)").matches &&
  dropdownItems.length > 0
) {
  dropdownItems.forEach((item) => {
    const btn = item.querySelector("[data-dropdown-btn]");
    const content = item.querySelector("[data-dropdown-content]");

    btn.addEventListener("click", (e) => {
      let isActive = btn.classList.toggle("active");
      content.style.maxHeight = isActive ? content.scrollHeight + "px" : null;
    });
  });
}
