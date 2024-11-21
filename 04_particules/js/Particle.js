export default class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xx = x;
    this.yy = y;

    this.x = this.x + Math.random() * 15;
    this.y = this.y + Math.random() * 15;

    // Vitesse de la particule
    this.vitesseX = 0;
    this.vitesseY = 0;

    // Accélération de la particule
    this.accelerationX = (Math.random() - 0.5) * 0.15;
    this.accelerationY = (Math.random() - 0.5) * 0.15;

    // Limite de vitesse
    this.vitesseMax = Math.random() * 5 + 1;

    //triangle cercle ou carre
    this.shape = Math.floor(Math.random() * 3) + 1;
  }

  // Mettre à jour la position et la vitesse de la particule
  update() {
    this.vitesseX += this.accelerationX;
    this.vitesseY += this.accelerationY;

    this.x += this.vitesseX;
    this.y += this.vitesseY;

    /*
    if (this.x > this.xx + 50) {
      this.vitesseX = this.vitesseX * -1;
    }

    if (this.x < this.xx - 50) {
      this.vitesseX = this.vitesseX * -1;
    }

    if (this.y > this.yy + 50) {
      this.vitesseY = this.vitesseY * -1;
    }

    if (this.y < this.yy - 50) {
      this.vitesseY = this.vitesseY * -1;
    }*/

    if (Math.sqrt((this.xx - this.x) ** 2 + (this.yy - this.y) ** 2) >= 60) {
      this.vitesseY = this.vitesseY * -1;
      this.vitesseX = this.vitesseX * -1;
      this.x = this.xx;
      this.y = this.yy;
    }
  }

  // Limiter la vitesse de la particule
  limiterVitesse() {
    // this.vitesseX = Math.min(this.vitesseX, this.vitesseMax);
    // this.vitesseY = Math.min(this.vitesseY, this.vitesseMax);

    this.vitesseX = Math.min(
      Math.max(this.vitesseX, -this.vitesseMax),
      this.vitesseMax
    );
    this.vitesseY = Math.min(
      Math.max(this.vitesseY, -this.vitesseMax),
      this.vitesseMax
    );
  }

  // Faire réapparaître la particule de l'autre côté si elle sort de l'écran
  gererBordsEcran() {
    if (this.x > window.innerWidth) this.x = 0;
    if (this.x < 0) this.x = window.innerWidth;
    if (this.y > window.innerHeight) this.y = 0;
    if (this.y < 0) this.y = window.innerHeight;
  }

  // Dessiner la particule
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI / 2);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    const size = 20;

    if (this.shape == 3) {
      ctx.strokeStyle = "lightgreen";
      ctx.lineWidth = 5;

      ctx.strokeRect(-size / 2, -size / 2, size, size);
    }
    if (this.shape == 2) {
      ctx.strokeStyle = "red";

      ctx.beginPath();
      ctx.lineWidth = 5;

      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.closePath();

      ctx.stroke();
    }
    if (this.shape == 1) {
      ctx.strokeStyle = "lightblue";

      ctx.beginPath();
      ctx.lineWidth = 5;
      const centerX = 0;
      const centerY = 0;
      const radius = size / 2;

      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);

      ctx.stroke();
    }
    ctx.restore();
  }
}
