document.addEventListener("DOMContentLoaded", function () {
  const starRating = document.getElementById("starRating");
  const ratingInput = document.getElementById("ratingInput");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("reviewForm");
  let currentRating = 0;
  if (starRating) {
    starRating.addEventListener("click", function (e) {
      const starBtn = e.target.closest(".star-btn");
      if (!starBtn) return;

      const rating = parseInt(starBtn.dataset.rating);
      setRating(rating);
    });

    starRating.addEventListener("mouseover", function (e) {
      const starBtn = e.target.closest(".star-btn");
      if (!starBtn) return;

      const rating = parseInt(starBtn.dataset.rating);
      highlightStars(rating);
    });

    starRating.addEventListener("mouseleave", function () {
      highlightStars(currentRating);
    });

    // form.addEventListener("submit", function (e) {
    //   e.preventDefault();

    //   const formData = new FormData(form);
    //   const data = Object.fromEntries(formData.entries());

    //   alert("Review submitted successfully!");
    //   form.reset();
    //   setRating(0);
    // });

    function setRating(rating) {
      currentRating = rating;
      ratingInput.value = rating;
      highlightStars(rating);
      submitBtn.disabled = rating === 0;
    }

    function highlightStars(rating) {
      const stars = starRating.getElementsByClassName("star");
      Array.from(stars).forEach((star, index) => {
        star.classList.toggle("filled", index < rating);
        if (index < rating) {
          star.setAttribute("fill", "currentColor");
          star.setAttribute("stroke", "none");
        } else {
          star.setAttribute("fill", "none");
          star.setAttribute("stroke", "currentColor");
        }
      });
    }
  }
});
