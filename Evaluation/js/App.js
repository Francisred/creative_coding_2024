import BaseApp from "./BaseApp";
import ParticleSystem from "./ParticleSystem";

export default class App extends BaseApp {
  constructor() {
    super();
    this.init();

    this.particleSystem = new ParticleSystem();
    this.notetext;
    this.draw();
  }
  init() {
    console.log("initialisé", navigator);

    // if (navigator.requestMIDIAcess()) {
    navigator
      .requestMIDIAccess()
      .then(this.setupMIDI.bind(this))
      .catch((err) => console.error(err));
    //} else {
    //console.log("erreurrequestmidi");
    //}
  }

  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particle system
    this.particleSystem.update();
    this.particleSystem.draw(this.ctx);

    // Continue animation
    requestAnimationFrame(() => this.draw());
  }

  setupMIDI(midiAccess) {
    console.log("midi");
    const inputs = midiAccess.inputs.values();
    for (const input of inputs) {
      console.log("piano", input);
      input.onmidimessage = this.handleMIDIMessage.bind(this);
    }
  }

  handleMIDIMessage(message) {
    const [command, controller, value] = message.data;
    if (command !== 248) {
      console.log(command, controller, value);
      this.notetext = "b";

      const notes = {
        DO: [36, 48, 60, 72, 84, 96],
        RE: [38, 50, 62, 74, 86, 98],
        MI: [40, 52, 64, 76, 88, 100],
        FA: [41, 53, 65, 77, 89, 101],
        SOL: [43, 55, 67, 79, 91, 103],
        LA: [45, 57, 69, 81, 93],
        SI: [47, 59, 71, 83, 95],
      };

      const colors = {
        DO: "#FF0000",
        RE: "orange",
        MI: "yellow",
        FA: "green",
        SOL: "blue",
        LA: "indigo",
        SI: "violet",
      };

      for (const [note, values] of Object.entries(notes)) {
        if (values.includes(controller)) {
          this.notetext = note;
          this.color = colors[note];
          break;
        }
      }
      if (command === 144) {
        // random endroit
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;

        //  taille
        const size = (value / 127) * 3;

        const lowhigh = controller / 1;

        this.particleSystem.createParticles(
          x,
          y,
          size,
          this.notetext,
          this.color
        );
      }
    }
  }
}
