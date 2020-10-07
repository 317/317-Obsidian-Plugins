class BetterWordCounterPlugin {
  constructor() {
    this.id = 'better-word-counter'
    this.name = 'Better Word Counter'
    this.description = 'A Better Word Counter'
    this.defaultOn = true
    this.wordCounters = { global: 0, selection: 0 };
    this.charCounters = { global: 0, selection: 0 };
    this.contents = "";
    this.updateSelectedWordCountEvent = () => this.updateSelectedWordCount();
    var Ae, Te = i18next.t.bind(i18next);
    this.i18n = Te;
  }

  init(app, instance) {
    const { statusBar } = app;
    statusBar.containerEl.lastChild.remove();
    this.app = app
    this.instance = instance
    this.instance.registerStatusBarItem()
  }

  onEnable({ workspace }, instance) {
    instance.registerEvent(workspace.on('file-open', this.onFileOpen, this))
    instance.registerEvent(
      workspace.on('quick-preview', this.onQuickPreview, this)
    )
    window.addEventListener('mouseup', this.updateSelectedWordCountEvent);
  }

  onDisable({ workspace }, instance) {
    window.removeEventListener('mouseup', this.updateSelectedWordCountEvent, false);
  };

  async onFileOpen(file) {

    if (!file || file.extension !== 'md')
      return;

    this.contents = await this.app.vault.cachedRead(file)
    this.updateWordCount()
  }

  onQuickPreview(file, contents) {
    const leaf = this.app.workspace.activeLeaf
    if (leaf && leaf.view.file === file) {
      this.updateWordCount()
    }
  }

  getWordCount(text) {
    let words = 0
    const matches = text.match(/[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/gm)
    if (matches) {
      for (let i = 0; i < matches.length; i++) {
        console.log("tik", matches[i])
        if (matches[i].charCodeAt(0) > 19968) {
          words += matches[i].length
        } else {
          words += 1
        }
      }
    }
    return words;
  }

  updateSelectedWordCount() {
    this.wordCounters.selection = this.getWordCount(window.getSelection().toString());
    this.charCounters.selection = window.getSelection().toString().length;
    this.updateStatusBar();
  }

  updateWordCount() {
    console.log("updateWordCount contents:", this.contents)
    this.wordCounters.global = this.getWordCount(this.contents);

    this.charCounters.global = this.contents.length;
    this.updateSelectedWordCount();
    this.updateStatusBar();
  }

  updateStatusBar() {
    console.log("updateStatusBar", this.wordCounters, this.charCounters);
    const { statusBarEl } = this.instance

    if (!statusBarEl) return

    statusBarEl.empty()

    const isPlural = (counter) => counter.selection === 1 || counter.selection === 0 && counter.global <= 1 ? '' : '_plural';
    const counterDisplay = (counter) => counter.selection > 0 ? `${counter.selection}/${counter.global}` : `${counter.global}`;

    statusBarEl.createEl('span', {
      cls: 'status-bar-item-segment',
      text: this.i18n("nouns.word-with-count" + isPlural(this.wordCounters), { count: counterDisplay(this.wordCounters) })
    })

    statusBarEl.createEl('span', {
      cls: 'status-bar-item-segment',
      text: this.i18n("nouns.character-with-count" + isPlural(this.charCounters), { count: counterDisplay(this.charCounters) })
    })
  }
}
module.exports = () => new BetterWordCounterPlugin()


