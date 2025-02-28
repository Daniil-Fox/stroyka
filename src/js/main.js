import "./_components.js";
import { burger } from "./functions/burger.js";

document.addEventListener("DOMContentLoaded", function () {
  const productItems = document.querySelectorAll(".products-item");
  if (productItems.length > 0) {
    productItems.forEach((item) => {
      const minusButton = item.querySelector(".products-item__minus");
      const plusButton = item.querySelector(".products-item__plus");
      const input = item.querySelector("input[type='number']");

      minusButton?.addEventListener("click", () => {
        let currentValue = Number(input.value);
        const minValue = Number(input.min);
        if (!isNaN(currentValue) && currentValue > minValue) {
          input.value = currentValue - 1;
        }
      });

      // Добавляем обработчик для кнопки "плюс"
      plusButton?.addEventListener("click", () => {
        let currentValue = Number(input.value);
        const maxValue = Number(input.max);
        if (!isNaN(currentValue) && currentValue < maxValue) {
          input.value = currentValue + 1;
        }
      });
    });
  }

  const dropdownContainers = document.querySelectorAll(".dropdown");
  if (dropdownContainers.length > 0) {
    dropdownContainers.forEach((dd) => {
      const ddHeader = dd.querySelector(".dropdown__header");
      const ddHeaderText = dd.querySelector(".dropdown__header > span");
      const ddContent = dd.querySelector(".dropdown__content");
      const ddLinks = ddContent.querySelectorAll(".dropdown__item");
      let isActive = false;
      ddHeader.addEventListener("click", (e) => {
        isActive = ddHeader.classList.toggle("active");
        ddContent.style.maxHeight = isActive
          ? ddContent.scrollHeight + "px"
          : null;
      });
      ddLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          ddHeader.classList.remove("active");
          ddHeaderText.textContent = link.textContent;
          ddContent.style.maxHeight = null;
        });
      });
    });
  }

  const fileAttach = document.querySelectorAll("[data-file]");
  if (fileAttach.length > 0) {
    fileAttach.forEach((fa) => {
      const text = fa.querySelector("[data-names]");
      const input = fa.querySelector("input");

      input.addEventListener("change", (e) => {
        if (input.files.length > 0) {
          text.textContent = [...input.files]
            .map((item) => item.name)
            .join(",");
        } else {
          text.textContent = "Прикрепить файл";
        }
      });
    });
  }

  const breadcrumbs = document.querySelector(".breadcrumbs ul");
  const items = Array.from(breadcrumbs.children);
  const ellipsis = document.createElement("li");
  ellipsis.classList.add("ellipsis");
  ellipsis.textContent = "...";

  const adjustBreadcrumbs = () => {
    const breadWidth = breadcrumbs.scrollWidth;
    const totalItems = items.length;
    let usedWidth = 0;

    // Сброс состояния
    items.forEach((item) => item.classList.remove("hidden"));
    ellipsis.remove();

    // Вычисляем ширины
    for (let i = 0; i < totalItems; i++) {
      const item = items[i];
      usedWidth += item.offsetWidth;

      // Если ширина превышена, скрываем промежуточные элементы
      if (breadWidth >= window.innerWidth) {
        if (i > 1 && i < totalItems - 1) {
          items.slice(1, totalItems - 1).forEach((midItem) => {
            midItem.classList.add("hidden");
          });
          breadcrumbs.insertBefore(ellipsis, items[totalItems - 1]);
        }
      }
    }
  };

  // Вызываем функцию при загрузке и изменении размера окна
  adjustBreadcrumbs();
  // window.addEventListener("resize", adjustBreadcrumbs);
});
