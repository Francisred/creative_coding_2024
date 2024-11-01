const coordsDiv = document.getElementById("coords");

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX; //
  const mouseY = event.clientY;
  //console.log(`Mouse Position: (X: ${mouseX}, Y: ${mouseY})`);
});

export default class Circle {
  constructor(context) {
    this.ctx = context;
  }

  draw(x, y, radius, random, ycoor, decal, xcoor) {
    // this.ctx = this.canvas.getContext("2d");
    this.ctx.beginPath();
    this.ctx.moveTo(x + 20 + decal * 35, y + 20 + ycoor); // Move to the first vertex
    this.ctx.lineTo(x + 40 + decal * 35 + xcoor, y + 20); // Draw line to the second vertex
    this.ctx.lineTo(x + 30 + decal * 20 + xcoor, y + 40 + ycoor); // Draw line to the third vertex
    // this.ctx.stroke();
    if (random == 1) {
      this.ctx.fillStyle = "magenta"; // Set the fill color to red
    }
    if (random == 2) {
      this.ctx.fillStyle = "yellow";
    }
    if (random == 3) {
      this.ctx.fillStyle = "cyan";
    }
    this.ctx.fill();
  }

  drawCross(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x - radius, y);
    this.ctx.lineTo(x + radius, y);
    this.ctx.moveTo(x, y - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.stroke();
  }
}
