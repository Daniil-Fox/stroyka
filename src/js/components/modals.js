const modal = document.querySelectorAll(".modal");

if (modal.length > 0) {
  const modalBtns = document.querySelectorAll(".modal-btn");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute("data-target");
      const currentModal = document.getElementById(modalId);

      if (currentModal) {
        modal.forEach((modal) => {
          if (modal.classList.contains("active")) {
            modal.classList.remove("active");
          }
        });
        currentModal.classList.add("active");
      }
    });
  });

  modal.forEach((modal) => {
    const modalClose = modal.querySelector(".modal__close");
    const modalCancel = modal.querySelector(".modal-cancel");
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        modal.classList.remove("active");
      }
    });

    modalClose?.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("active");
    });

    modalCancel?.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("active");
    });
  });
}
