// i used patt vira's ASCII tutorial: https://youtu.be/4IyeLc6J1Uo?si=60tnjnFLQ6FBlnr7
// adapted it by replacing the ASCII characters with characters from a string of my spotify data

let img;
let size = 10;
let asciiChar = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. ";

let myData = "Dean Blunt - Slacker - ZUSHI - US - 2026-05-15T01:03:13Z - 74507ms - osx - 1778806828";
let dataIndex = 0;

let boldStart = myData.indexOf("ZUSHI");
let boldEnd = boldStart + "ZUSHI".length;

function preload() {
  img = loadImage("../images/us!.png");
}

function setup() {
  createCanvas(600, 600);
  img.resize(100, 0);
  size = width / img.width;
  noLoop();
}

function draw() {
  background(255);

  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let pixelIndex = (i + j * img.width) * 4;
      let r = img.pixels[pixelIndex + 0];
      let g = img.pixels[pixelIndex + 1];
      let b = img.pixels[pixelIndex + 2];

      let bright = (r + g + b) / 3;
      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length));

      let x = i * size + size / 2;
      let y = j * size + size / 2;

      let t = asciiChar.charAt(tIndex);
      let sourceIndex = dataIndex % myData.length;

      if (tIndex < asciiChar.length * 0.6 && myData.length > 0) {
        t = myData.charAt(sourceIndex);
        dataIndex++;
      }

      //bold only if this character came from the "ZUSHI" range in myData
      if (sourceIndex >= boldStart && sourceIndex < boldEnd) {
        textStyle(BOLD);
      } else {
        textStyle(NORMAL);
      }

      noStroke();
      fill(255,0,0);
      textSize(size);
      textAlign(CENTER, CENTER);
      text(t, x, y);
    }
  }
}