import Particle from "./Particle";

export default class ParticleSystem {
  constructor() {
    this.particles = [];
    this.particlesPerClick = 10; // Number of particles to create per click
  }

  createParticles(x, y, size, note, colors) {
    for (let i = 0; i < this.particlesPerClick; i++) {
      const particle = new Particle(x, y, size, note, colors);

      // Give each particle a random initial velocity
      const angle = Math.random() * Math.PI * 2;
      const magnitude = 20; // Random initial speed

      particle.velocity.x = Math.cos(angle) * magnitude;
      particle.velocity.y = Math.sin(angle) * magnitude;

      this.particles.push(particle);
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.applyForce({ x: 0.01, y: 0 }); // Example: gravity
      particle.update();

      //verifie si offscreen
      if (
        particle.position.x < -100 ||
        particle.position.x > window.innerWidth + 100 ||
        particle.position.y < -100 ||
        particle.position.y > window.innerHeight + 100
      ) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    for (const particle of this.particles) {
      particle.draw(ctx);
    }
  }
}
