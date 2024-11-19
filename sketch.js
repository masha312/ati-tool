let waveSketch = (p) => {
  let img = null;
  let titleText = "";
  let fontSize = 120 / 2.5;
  let location = "top";
  let customFont;
  let platform = "instagram";
  let platformOffset = 240;

  p.preload = () => {
    customFont = p.loadFont("./Karrik-Italic.otf");
  };

  p.setup = () => {
    let waveWrapper = p.createCanvas(1080 / 2.5, 1920 / 2.5);
    waveWrapper.parent("sketch-wrapper");
    p.background(255);
    p.textFont(customFont);
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

      p.fill(73, 16, 206, 30);
      p.noStroke();
      p.rect(0, 0, p.width, p.height);
    }

    if (platform === "instagram") {
      platformOffset = 280;
      console.log(platformOffset);
    } else {
      platformOffset = 360;
      console.log(platformOffset);
    }

    if (titleText) {
      if (location === "top") {
        p.textAlign(p.RIGHT, p.TOP);
        p.push();
        setGradient(
          0,
          0,
          p.width,
          platformOffset + 100,
          p.color(0),
          p.color(0, 4)
        );
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
          platformOffset + 100,
          p.color(0, 4),
          p.color(0)
        );
        p.noStroke();
        p.rect(0, p.height - platformOffset, p.width, platformOffset);
        p.pop();
      }

      p.textSize(fontSize);

      let xPosition = p.width - 80 / 2.5;
      let yPosition =
        location === "top"
          ? 0 + platformOffset / 4
          : p.height - platformOffset / 2.5;
      const availableWidth = p.width - 80;

      let wrappedText = wrapText(titleText.toUpperCase(), availableWidth);

      const lineHeight = fontSize * 0.8;
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
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      let word = words[i];
      let testLine = `${currentLine} ${word}`;
      let testWidth = p.textWidth(testLine);

      if (testWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

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
    let platformSuffix =
      platform === "tiktok"
        ? "tt"
        : platform === "instagram"
        ? "ig"
        : "default";
    let fileName = `${platformSuffix}-thumbnail.png`;
    p.save(fileName);
  };
};

const sketchInstance = new p5(waveSketch);
window.sketchInstance = sketchInstance;
