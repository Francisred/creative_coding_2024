import Letter from "./Letter.js";
import character from "./Easing.js";
export default class App {
  constructor() {
    this.canvas;
    this.ctx;
    // premier étape : créer le canvas
    this.createCanvas();
    //créer un cercle
    this.letter2 = new Letter((3 * window.innerWidth) / 4, -100, 100);
    this.letter = new Letter((1 * window.innerWidth) / 4, -100, 100);

    this.letter3 = new Letter((2 * window.innerWidth) / 4, -100, 100);
    this.counter = 1;
    // initialiser l'interaction click
    this.initInteraction();
    // dessiner le canvas
    this.draw();
    this.counter = 0;
  }
  function(a, b) {
    if (this.counter == 0) {
      a.reset(b / 4, window.innerHeight / 2);
    } else {
      a.reset(b / 4, window.innerHeight * 1.5);
    }
  }
  createCanvas(width = window.innerWidth, height = window.innerHeight) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }

  initInteraction() {
    document.addEventListener("click", (e) => {
      if (this.letter3.y > window.innerHeight) {
        this.letter3.y = -100;
        this.letter3 = new Letter((2 * window.innerWidth) / 4, -100, 100);
        console.log("oh yeq");
        this.counter = 0;
      } else {
      }
      this.function(this.letter3, 2 * window.innerWidth);
      /////
      if (this.letter2.y > window.innerHeight) {
        this.letter2.y = -100;
        this.letter2 = new Letter((3 * window.innerWidth) / 4, -100, 100);
        console.log("oh yeq");
        this.counter = 0;
      } else {
      }
      this.function(this.letter2, 3 * window.innerWidth);
      /////
      if (this.letter.y > window.innerHeight) {
        this.letter.y = -100;
        this.letter = new Letter((1 * window.innerWidth) / 4, -100, 100);
        console.log("oh yeq");
        this.counter = 0;
      } else {
      }
      this.function(this.letter, 1 * window.innerWidth);

      this.counter++;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    // dessiner le cercle

    this.letter2.update();

    this.letter2.dessine(this.ctx);
    this.letter3.update();

    this.letter3.dessine(this.ctx);
    this.letter.update();

    this.letter.dessine(this.ctx);
    // transformer le canvas en flip book
    requestAnimationFrame(this.draw.bind(this));
  }
}
