document.addEventListener("DOMContentLoaded", () => {
  const filter = document.querySelector(".filter");

  if (filter) {
    const filterWrapper = filter.querySelector(".filter__wrapper");
    // Modal functionality
    const filterTriggers = document.querySelectorAll("[data-filter-trigger]");
    const filterCloseButtons = document.querySelectorAll("[data-filter-close]");

    // Открытие фильтра
    filterTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        if (window.innerWidth < 576) {
          filter.classList.add("active");
        } else {
          let isActive = filter.classList.toggle("active");
          filter.style.maxHeight = isActive ? filter.scrollHeight + "px" : 0;
        }
      });
    });

    // Закрытие фильтра
    filterCloseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filter.classList.remove("active");
        document.body.style.overflow = ""; // Возвращаем скролл
      });
    });

    // Закрытие по клику вне фильтра
    filter.addEventListener("click", (e) => {
      if (e.target === filter) {
        filter.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Toggle sections
    const toggleButtons = document.querySelectorAll(".filter__toggle");
    toggleButtons.forEach((button) => {
      const group = button.closest(".filter__group");
      const content = group.querySelector(".filter__options, .filter__price");

      // Сворачиваем все фильтры, кроме цены
      if (content && !content.classList.contains("filter__price")) {
        content.style.display = "none";
      } else if (content && content.classList.contains("filter__price")) {
        button.classList.add("filter__toggle--active");
      }

      button.addEventListener("click", () => {
        button.classList.toggle("filter__toggle--active");
        if (content) {
          content.style.display =
            content.style.display === "none" ? "block" : "none";
        }
      });
    });

    // Price range slider with noUiSlider
    const priceSlider = document.querySelector(".filter__range-slider");
    const priceInputs = document.querySelectorAll(".filter__price-input");

    if (priceSlider) {
      noUiSlider.create(priceSlider, {
        start: [0, 100000],
        connect: true,
        step: 100,
        range: {
          min: 0,
          max: 100000,
        },
        format: {
          to: function (value) {
            return Math.round(value);
          },
          from: function (value) {
            return Number(value);
          },
        },
      });

      // Обновление инпутов при изменении слайдера
      priceSlider.noUiSlider.on("update", function (values, handle) {
        priceInputs[handle].value = values[handle];
      });

      // Обновление слайдера при изменении инпутов
      priceInputs.forEach((input, index) => {
        input.addEventListener("change", function () {
          const values = [null, null];
          values[index] = this.value;
          priceSlider.noUiSlider.set(values);
        });
      });
    }

    // Reset button
    const resetButton = document.querySelector(".filter__reset");
    resetButton.addEventListener("click", () => {
      document.querySelectorAll(".filter__checkbox").forEach((checkbox) => {
        checkbox.checked = false;
      });
      if (priceSlider.noUiSlider) {
        priceSlider.noUiSlider.set([0, 100000]);
      }
      priceInputs.forEach((input) => {
        input.value = "";
      });
    });
  }
});
