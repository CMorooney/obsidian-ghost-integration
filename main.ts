import { Notice, Plugin } from 'obsidian';
import { PluginSettings, DEFAULT_SETTINGS } from 'src/settings/settings';

export default class GhostIntegrationPlugin extends Plugin {
  settings: PluginSettings;

  async onload() {
    await this.loadSettings();

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        menu.addItem((item) => {
          item
            .setTitle("Publish to Ghost")
            .setIcon("ghost")
            .onClick(async () => {
              new Notice(file.path);
            });
        });
      })
    );
  }

  onunload() { }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

