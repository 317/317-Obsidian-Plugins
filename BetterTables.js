class BetterTablesPlugin {
  constructor() {
    this.id = 'better-tables'
    this.name = 'Better Tables'
    this.description = 'This is my tables. They are the best. '
    this.defaultOn = true
  }

  init(app, instance) {
    console.log("INIT")
    this.app = app
    this.instance = instance

    this.instance.registerGlobalCommand({
      id: 'btable:make',
      name: 'Better Tables : Make new table',
      callback: () => this.trigger()
    });
    console.log(this.app)
    console.log(this.app.hotkeyManager.customKeys)
    this.app.hotkeyManager.customKeys["btable:make"] = [{ modifiers: ["Mod"], key: "t" }];
  }

  trigger() {
    console.log("TABLE");
    console.log(this.instance);
    console.log(this.app);
  }
}


module.exports = () => new BetterTablesPlugin()