



const BT_TEMPLATE = `
|   |   |   |
|---|---|---|
|   |   |   |
|   |   |   |`;

const BetterTablesLib = require("./BetterTables.lib.js");

class BetterTablesPlugin {
  constructor() {
    this.id = 'better-tables'
    this.name = 'Better Tables'
    this.description = 'This is my tables. They are the best. '
    this.defaultOn = true
    this.isInTable = false;
    this.currentTable = "";
    this.keyPressed = "";
    this.keyCodePressed = "";
    this.lastkeyPressed = "";
    this.lastKeyCodePressed = "";


  }

  init(app, instance) {
    this.app = app
    this.instance = instance
    document.addEventListener('keypress', (e) => this.trigger(e));
  }

  trigger(e) {
    this.lastkeyPressed = this.keyPressed;
    this.lastCodePressed = this.lastKeyCodePressed
    this.keyPressed = e.key;
    this.keyCodePressed = e.keyCode;

    if (this.currentTable === "") {
      // Si la table est vide et que c'est pas un pipe, babye
      if (this.keyPressed !== "|") {
        return false;
      }
      // Si la table est vide, et que c'est un pipe
      if (this.keyPressed === "|") {
        this.currentTable = BetterTablesLib.pipeProcessing(this.currentTable, "first pipe");
        return;
      }
    } else {
      if (this.keyPressed === "|") {
        this.currentTable = BetterTablesLib.pipeProcessing(this.currentTable, "nth pipe");
        return;
      }
      // Si la table est pas vide et que c'est un saut de ligne
      if (this.keyPressed === "\n") {
        this.currentTable = BetterTablesLib.newLine(this.currentTable);
        return;
      }
      // Si la touche est TAB
      if (this.keyCodePressed === 9 && (this.lastkeyPressed == "|" || this.lastkeyPressed == "-")) {
        this.currentTable = BetterTablesLib.makeHeaderLine(this.currentTable);
        return;
      }
      // Si la table est pas vide et que c'est un autre caractère
      this.currentTable = this.currentTable.concat(this.keyPressed);
      return;
    }

    // Si la table est pas vide et que c'est un pipe

  }




}



module.exports = () => new BetterTablesPlugin()
