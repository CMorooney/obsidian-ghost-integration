import { Notice, Plugin, FileManager, TAbstractFile, TFile } from 'obsidian';
import { PluginSettings, DEFAULT_SETTINGS } from 'src/settings/settings';

export default class GhostIntegrationPlugin extends Plugin {
  settings: PluginSettings;
  fileManager = new FileManager();

  async onload() {
    await this.loadSettings();

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file: TAbstractFile) => {
        const actualFile = file as TFile;
        if(!actualFile) {
          new Notify("unable to read file");
          return;
        }

        menu.addItem((item) => {
          item
            .setTitle("Publish to Ghost")
            .setIcon("ghost")
            .onClick(() => this.tryToPublishToGhost(actualFile));
        });
      })
    );
  }

  tryToPublishToGhost(file: TFile) {
    try {
      this.fileManager.processFrontMatter(file, (data: any) => {
        console.log(`----- front matter processed:`);
        console.dir(data);
      });
    } catch(e) {
      new Notify("unexpected problem processing meta data for file");
      console.log(`***** error 1:`);
      console.dir(e)
    }
  }

  onunload() { }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

