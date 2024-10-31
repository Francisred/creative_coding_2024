import BaseApp from "./BaseApp.js";
import Utils from "./Utils.js";

export default class App extends BaseApp {
  constructor() {
    super();
    this.time = 0;
    this.amplitude = 50;
    this.frequency = 1.015;

    this.mouseX = 0;
    this.mouseY = 0;

    Utils.loadSVG("letter.svg").then((letterPoints) => {
      this.letter = letterPoints;

      window.addEventListener("mousemove", (event) => {
        //souris
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
      });

      this.animate();
    });
  }

  animate() {
    this.time += 0.07;
    this.ctx.clearRect(0, 0, this.width, this.height);

    //repeter dessin
    const times = 3;
    const offset = 400; // offset espace entre chaque letter

    for (let j = 0; j < times; j++) {
      this.ctx.beginPath();

      //decalage pour chacun des dessins
      this.letter.forEach((path) => this.drawPath(path, j * offset));

      this.ctx.fill();
    }

    requestAnimationFrame(this.animate.bind(this));
  }

  drawPath(path, offsetX) {
    for (let i = 0; i < path.length; i++) {
      const point = path[i];

      const angle = this.time + i * this.frequency + this.mouseX / this.width;

      const x =
        point.x +
        Math.sin(angle - this.mouseX / 10000) * this.amplitude +
        offsetX; // decalage
      const y =
        point.y + Math.sin(angle - this.mouseY / 10000) * this.amplitude;

      if (i !== 0) {
        this.ctx.lineTo(x, y);
      } else {
        this.ctx.moveTo(x, y);
      }
    }
  }
}
