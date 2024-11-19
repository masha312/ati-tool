const imageUpload = document.getElementById("imageUpload");
const titleInput = document.getElementById("title");
const fontSizeInput = document.getElementById("fontSize");
const locationInputs = document.querySelectorAll("input[name='location']");
const platformInputs = document.querySelectorAll("input[name='platform']");
const downloadBtn = document.getElementById("downloadBtn");

imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      window.sketchInstance.setImage({ type: "image", data: e.target.result });
    };

    reader.readAsDataURL(file);
    downloadBtn.disabled = false;
  }
});

titleInput.addEventListener("input", (event) => {
  sketchInstance.setTitleText(event.target.value);
});

fontSizeInput.addEventListener("input", (event) => {
  sketchInstance.setFontSize(Number(event.target.value));
});

locationInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.checked) {
      sketchInstance.setLocation(event.target.value);
    }
  });
});

platformInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.checked) {
      sketchInstance.setPlatform(event.target.value);
    }
  });
});

downloadBtn.addEventListener("click", () => {
  sketchInstance.saveImage();
});
