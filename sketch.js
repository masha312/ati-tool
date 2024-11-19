let waveSketch = (p) => {
  let img = null; // Variable to hold the uploaded image
  let titleText = ""; // Variable to hold the title text
  let fontSize = 120 / 2.5; // Default font size
  let location = "top";
  let customFont; // Variable for the custom font
  let platform = "instagram";
  let platformOffset = 240;

  p.preload = () => {
    // Load the custom font
    customFont = p.loadFont("./Karrik-Italic.otf");
  };

  p.setup = () => {
    let waveWrapper = p.createCanvas(1080 / 2.5, 1920 / 2.5);
    waveWrapper.parent("sketch-wrapper");
    p.background(255);
    p.textFont(customFont); // Set the custom font
    p.textStyle(p.ITALIC);
  };

  p.draw = () => {
    p.background("#4910CE");

    if (img) {
      let imgAspect = img.width / img.height;
      let renderWidth, renderHeight;
      renderHeight = p.height;
      renderWidth = p.height * imgAspect;

      let xOffset = (p.width - renderWidth) / 2;
      let yOffset = (p.height - renderHeight) / 2;

      p.image(img, xOffset, yOffset, renderWidth, renderHeight);
    }

    if (platform === "instagram") {
      platformOffset = 240;
      console.log(platformOffset);
    } else {
      platformOffset = 320;
      console.log(platformOffset);
    }

    if (titleText) {
      if (location === "top") {
        p.textAlign(p.RIGHT, p.TOP);
        p.push();
        setGradient(0, 0, p.width, platformOffset, p.color(0), p.color(0, 4));
        p.noStroke();
        p.rect(0, 0, p.width, platformOffset);
        p.pop();
      } else {
        p.textAlign(p.RIGHT, p.BOTTOM);
        p.push();

        setGradient(
          0,
          p.height - platformOffset,
          p.width,
          platformOffset,
          p.color(0, 4),
          p.color(0)
        );
        p.noStroke();
        p.rect(0, p.height - platformOffset, p.width, platformOffset);
        p.pop();
      }

      p.textSize(fontSize);

      let xPosition = p.width - 54 / 2.5;
      let yPosition =
        location === "top"
          ? 0 + platformOffset / 4
          : p.height - platformOffset / 2.5;
      const availableWidth = p.width - 54; // Ensure at least 120px from the left edge

      // Wrap text if necessary
      let wrappedText = wrapText(titleText.toUpperCase(), availableWidth);

      // Render each line of wrapped text
      const lineHeight = fontSize * 0.8; // Adjust line spacing
      wrappedText.forEach((line, i) => {
        p.fill(255);
        p.text(line, xPosition, yPosition + i * lineHeight);
        p.fill(255, 40);
        p.text(line, xPosition - 8, yPosition + i * lineHeight);
        p.fill(255, 20);
        p.text(line, xPosition - 16, yPosition + i * lineHeight);
      });
    }
  };

  // Function to load the image when a file is uploaded
  p.setImage = (file) => {
    if (file.type === "image") {
      img = p.loadImage(file.data, () => {
        console.log("Image loaded");
      });
    } else {
      console.log("Invalid file type");
    }
  };

  p.setTitleText = (text) => {
    titleText = text;
  };

  p.setFontSize = (size) => {
    fontSize = size;
  };

  p.setLocation = (loc) => {
    location = loc;
  };

  p.setPlatform = (newPlatform) => {
    platform = newPlatform;
  };

  function wrapText(text, maxWidth) {
    let words = text.split(" ");
    let lines = [];
    let currentLine = words[0]; // Initialize with the first word

    for (let i = 1; i < words.length; i++) {
      let word = words[i];
      let testLine = `${currentLine} ${word}`;
      let testWidth = p.textWidth(testLine);

      if (testWidth > maxWidth) {
        lines.push(currentLine); // Add the current line to the array
        currentLine = word; // Start a new line with the current word
      } else {
        currentLine = testLine; // Add the word to the current line
      }
    }

    // Push the last line if it exists
    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  function setGradient(x, y, w, h, c1, c2) {
    p.noFill();

    for (let i = y; i <= y + h; i++) {
      let inter = p.map(i, y, y + h, 0, 1);
      let c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(x, i, x + w, i);
    }
  }
  p.saveImage = () => {
    p.save("canvas-image.png");
  };
};

const sketchInstance = new p5(waveSketch);
window.sketchInstance = sketchInstance; // Expose it for external access
