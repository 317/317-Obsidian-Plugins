

module.exports = () => {
  import { readFile } from 'fs'
  const BT_TEMPLATE_PATH = "./BetterTables/bt-template.md";
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
        name: 'Better Tables: Make new table',
        callback: () => this.trigger()
      });
      console.log(this.app)
      console.log(this.app.hotkeyManager.customKeys)
      this.app.hotkeyManager.customKeys["btable:make"] = [{ modifiers: ["Mod"], key: "t" }];
    }

    trigger() {
      fs.readFile(BT_TEMPLATE_PATH, 'utf8', (err, data) => {
        console.group("insertAtCaret", data);

        this.insertAtCaret(this.btTemplate);

      });
      console.groupEnd();

      console.log(this.instance);
      console.log(this.app);
    }



    insertAtCaret(text) {
      var txtarea = document.activeElement;
      var scrollPos = txtarea.scrollTop;
      var strPos = 0;
      var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
      if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
      }
      else if (br == "ff") strPos = txtarea.selectionStart;

      var front = (txtarea.value).substring(0, strPos);
      var back = (txtarea.value).substring(strPos, txtarea.value.length);
      txtarea.value = front + text + back;
      strPos = strPos + text.length;
      if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        range.moveStart('character', strPos);
        range.moveEnd('character', 0);
        range.select();
      }
      else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
      }
      txtarea.scrollTop = scrollPos;
    }

  }




  new BetterTablesPlugin();
}