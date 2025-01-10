export default class Particle {
  constructor(x, y, size, note, color) {
    this.position = {
      x: x || 0,
      y: y || 0,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.acceleration = {
      x: 0,
      y: 0,
    };

    // Additional properties
    this.color = color;

    this.radius = size;
    this.maxSpeed = 10;
    this.orientation = 0; // in radians
    this.note = note;
  }

  static async loadFont() {
    if (!Particle.fontLoaded) {
      const font = new FontFace(
        "Trispace",
        "url(./js/Trispace-VariableFont_wdth,wght.ttf)"
      );
      await font.load(); //debug
      document.fonts.add(font);
      Particle.fontLoaded = true;
    }
  }

  applyForce(force) {
    this.acceleration.x += force.x;
    this.acceleration.y += force.y;
  }

  // Update particle physics
  update() {
    // Update velocity by adding acceleration
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    // Limit speed
    const speed = Math.sqrt(
      this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y
    );
    if (speed > this.maxSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
      this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
    }

    // Update position by adding velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Calculate orientation based on velocity direction
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.orientation = Math.atan2(this.velocity.y, this.velocity.x);
    }

    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  draw(ctx) {
    if (!Particle.fontLoaded) return;

    ctx.save();

    // Move to particle position and rotate
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.orientation);

    // Use radius to calculate font weight and size
    const weight = Math.min(900, Math.max(100, this.radius * 100));
    ctx.font = `bold ${this.radius * 50}px 'Trispace', sans-serif`;
    ctx.fontVariationSettings = `'wght' ${weight}`;
    ctx.fillStyle = this.color || "#FF5733";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.note, 0, 0);

    ctx.restore();
  }
}
//debug
Particle.fontLoaded = false;
Particle.loadFont();
