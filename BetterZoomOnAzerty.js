class BetterZoomOnAzertyPlugin {
  constructor() {
    this.id = 'better-azerty-zoom'
    this.name = 'Better Zoom On Azerty Keyboard'
    this.description = 'Better Zoom On Azerty Keyboard'
    this.defaultOn = true
    this.zoom = {
      step: 10,
      current: 100,
      neutral: 100,
      min: 70,
      max: 160
    };

  }

  init(app, instance) {
    console.log("INIT")
    this.app = app
    this.instance = instance

    this.instance.registerGlobalCommand({
      id: 'bzoom:zoomOut',
      name: 'Better Zoom : Zoom Out',
      callback: () => this.zoomOut()
    });

    this.instance.registerGlobalCommand({
      id: 'bzoom:zoomIn',
      name: 'Better Zoom : Zoom In',
      callback: () => this.zoomIn()
    });

    this.instance.registerGlobalCommand({
      id: 'bzoom:reset',
      name: 'Better Zoom : Reset Zoom',
      callback: () => this.resetZoom()
    });

    this.app.hotkeyManager.customKeys["bzoom:zoomOut"] = [{ modifiers: ["Mod"], key: "-" }];
    this.app.hotkeyManager.customKeys["bzoom:zoomIn"] = [{ modifiers: ["Mod"], key: "=" }, { modifiers: ["Mod"], key: "+" }];
    this.app.hotkeyManager.customKeys["bzoom:reset"] = [{ modifiers: ["Mod"], key: "à" }, { modifiers: ["Mod"], key: "0" }];
  }

  zoomOut() {

    this.zoom.current -= this.zoom.step;
    if (this.zoom.current <= this.zoom.min) {
      this.zoom.current = this.zoom.min;
    }
    this.applyZoom();
  }

  zoomIn() {
    this.zoom.current += this.zoom.step;

    if (this.zoom.current >= this.zoom.max) {
      this.zoom.current = this.zoom.max;
    }
    this.applyZoom();
  }

  resetZoom() {
    this.zoom.current = this.zoom.neutral;
    this.applyZoom();
  }

  applyZoom() {
    document.body.style.zoom = `${this.zoom.current}%`;

  }
}


module.exports = () => new BetterZoomOnAzertyPlugin()