import { Swiper } from "swiper";
import { EffectFade, Navigation, Thumbs } from "swiper/modules";

Swiper.use([Navigation, Thumbs, EffectFade]);

const productsSliders = document.querySelectorAll(".products__slider");
productsSliders.forEach((slider) => {
  const parent = slider.closest(".products");
  const prevBtn = parent.querySelector(".products-prev");
  const nextBtn = parent.querySelector(".products-next");
  new Swiper(slider, {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      375: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });
});

const tabs = new Swiper(".single-prod__slider", {
  slidesPerView: "auto",
  spaceBetween: 6,
});

const tabsContent = new Swiper(".single-prod__main", {
  slidesPerView: 1,
  spaceBetween: 20,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  thumbs: {
    swiper: tabs,
  },
});

const navSlider = new Swiper(".header__nav", {
  slidesPerView: "auto",
  spaceBetween: 20,
});

window.addEventListener("DOMContentLoaded", () => {
  const resizableSwiper = (
    breakpoint,
    swiperClass,
    swiperSettings,
    callback
  ) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    };

    const checker = function () {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  };

  const someFunc = (instance) => {
    if (instance) {
      instance.on("slideChange", function (e) {
        console.log("*** mySwiper.activeIndex", instance.activeIndex);
      });
    }
  };

  resizableSwiper("(max-width: 900px)", ".hero__bottom-slider", {
    spaceBetween: 10,
    slidesPerView: "auto",
  });
});
