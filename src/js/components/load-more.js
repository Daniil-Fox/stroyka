const moreContainer = document.querySelectorAll("[data-more-container]");

if (
  window.matchMedia("(max-width: 900px)").matches &&
  moreContainer.length > 0
) {
  moreContainer.forEach((cont) => {
    const btn = cont.querySelector("[data-more-btn]");
    const moreItems = cont.querySelector("[data-more-items]");
    if (btn) {
      const oldText = btn.textContent;

      btn.textContent = "показать еще";

      let isVisible = 6;
      const items = [...moreItems.children];

      for (let i = 0; i < isVisible; i++) {
        items[i].style.display = "flex";
      }
      for (let i = isVisible; i < items.length; i++) {
        items[i].style.display = "none";
      }
      btn.addEventListener("click", (e) => {
        if (isVisible < items.length) {
          e.preventDefault();
        } else {
          return;
        }
        for (let i = isVisible; i < isVisible + 6; i++) {
          items[i].style.display = "flex";
        }
        isVisible += 6;

        if (isVisible >= items.length) {
          if (!btn.dataset.linkBtn) {
            btn.textContent = oldText;
          } else {
            btn.remove();
          }
        }
      });
    }
  });
}
