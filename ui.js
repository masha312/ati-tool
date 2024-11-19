const imageUpload = document.getElementById("imageUpload");
const titleInput = document.getElementById("title");
const fontSizeInput = document.getElementById("fontSize");
const locationInputs = document.querySelectorAll("input[name='location']");
const platformInputs = document.querySelectorAll("input[name='platform']");
const downloadBtn = document.getElementById("downloadBtn");

// Use the global sketch instance
imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Pass the loaded file data to the global sketch instance
      window.sketchInstance.setImage({ type: "image", data: e.target.result });
    };

    reader.readAsDataURL(file);
    downloadBtn.disabled = false;
  }
});

// Handle title input
titleInput.addEventListener("input", (event) => {
  sketchInstance.setTitleText(event.target.value);
});

// Handle font size input
fontSizeInput.addEventListener("input", (event) => {
  sketchInstance.setFontSize(Number(event.target.value));
});

// Handle location input
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

// Save image as PNG
downloadBtn.addEventListener("click", () => {
  sketchInstance.saveImage();
});
