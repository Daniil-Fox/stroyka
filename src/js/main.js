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

  if (breadcrumbs) {
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

    adjustBreadcrumbs();
  }

  const pagination = document.querySelector(".pagination ul");
  if (pagination) {
    const items = Array.from(pagination.children);

    const adjustPagination = () => {
      const availableWidth = pagination.offsetWidth;
      const totalItems = items.length;

      // Сброс всех скрытых элементов
      items.forEach((item) => item.classList.remove("hidden"));

      // Получаем важные элементы
      const first = items[1]; // Первая страница
      const last = items[items.length - 2]; // Последняя страница
      const prev = items[0]; // Кнопка "Назад"
      const next = items[items.length - 1]; // Кнопка "Вперед"

      let currentWidth = Array.from(items).reduce(
        (sum, item) => sum + item.offsetWidth,
        0
      );

      if (currentWidth > availableWidth) {
        // Начинаем скрывать элементы
        const middleItems = items.slice(1, -2);

        // Первый этап: оставляем только 1, 2, ..., последнюю
        middleItems.forEach((item, index) => {
          if (index !== 0 && index !== middleItems.length - 1) {
            item.classList.add("is-hidden");
          }
        });

        currentWidth = Array.from(items).reduce(
          (sum, item) =>
            sum + (item.classList.contains("is-hidden") ? 0 : item.offsetWidth),
          0
        );

        // Если всё ещё не помещается, оставляем только 1, ..., последнюю
        if (currentWidth > availableWidth) {
          middleItems.forEach((item) => {
            if (!item.querySelector("a")) {
              item.classList.add("is-hidden");
            }
          });
        }
      }
    };

    // Обработчики событий
    adjustPagination();
    window.addEventListener("resize", adjustPagination);
  }
});
