const fileInput = document.querySelector("#file-input");
const fileCountSpan = document.querySelector("#pinBtn span");
const MAX_FILES = 10; // максимальное количество файлов

if (fileInput) {
  fileInput.addEventListener("change", function () {
    const numberOfFiles = this.files.length;
    if (numberOfFiles > MAX_FILES) {
      alert(`Максимальное количество файлов: ${MAX_FILES}`);
      this.value = "";
      fileCountSpan.textContent = "0";
    } else {
      fileCountSpan.textContent = numberOfFiles;
    }
  });
}
