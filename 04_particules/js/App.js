import BaseApp from "./BaseApp";
import Particle from "./Particle";

export default class App extends BaseApp {
  constructor() {
    super();
    this.collection = [];
    //mousemove
    document.addEventListener("click", (event) => {
      for (let i = 0; i < 50; i++) {
        const particule = new Particle(event.x, event.y);
        this.collection.push(particule);
      }
    });

    this.draw();
  }

  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.collection.forEach((particule) => {
      // Update particle
      particule.update();
      particule.gererBordsEcran();
      particule.limiterVitesse();
      particule.draw(this.ctx);
    });

    requestAnimationFrame(() => this.draw());
  }
}
