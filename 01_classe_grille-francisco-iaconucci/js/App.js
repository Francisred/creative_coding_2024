import Circle from "./Circle.js";

export default class App {
  constructor() {
    this.canvas;
    this.ctx;
  }
  createCanvas(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }

  circle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    // this.ctx.stroke();
    this.ctx.fill();
  }

  createGrid() {
    const monCercle = new Circle(this.ctx);
    let stepX = 50;
    let stepY = 20;
    let radius = 5;
    let spaceX = window.innerWidth / stepX;
    let spaceY = window.innerHeight / stepY;

    for (let i = 0; i < stepX; i++) {
      for (let j = 0; j < stepY; j++) {
        // do something
        let random = Math.floor(Math.random() * 3) + 1;
        let decal = 0;
        let ycoor = j ** 2;
        let xcoor = i ** 2;

        if (j % 2 == 0) {
          decal = 1;
        } else {
          decal = 0;
        }
        monCercle.draw(
          i * spaceX + radius,
          j * spaceY + radius,
          radius,
          random,
          ycoor,
          decal,
          xcoor
        );
      }
    }
  }
}
