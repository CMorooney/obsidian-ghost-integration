import { App, PluginSettingTab, Setting } from 'obsidian';
import GhostIntegrationPlugin from '../../main';

export interface PluginSettings {
  ghostApiKey: string;
  ghostUrl: string;
  ghostApiVersion: string;
};

export const DEFAULT_SETTINGS: PluginSettings = {
  ghostApiKey: '',
  ghostUrl: '',
  ghostApiVersion: 'v5.0'
}

export class SettingsTab extends PluginSettingTab {
  constructor(app: App, private plugin: GhostIntegrationPlugin) {
    super(app, plugin);
  }

  get settings() {
    return this.plugin.settings;
  }

  display(): void {
    // set up container element
    const { containerEl } = this;
    containerEl.empty();
    containerEl.classList.add('ghost-integration-plugin__settings');

    //set up header
    const titleEl = document.createDocumentFragment();
    titleEl.createEl('h2', { text: 'General Settings' });
    new Setting(containerEl)
      .setHeading()
      .setName(titleEl);

    // set up api key text field
    new Setting(containerEl)
      .setName('Ghost Api Key')
      .addTextArea(textArea => {
        const prevValue = this.plugin.settings.ghostApiKey;
        textArea
          .setValue(prevValue)
          .onChange(async newValue => {
            this.plugin.settings.ghostApiKey = newValue;
            await this.plugin.saveSettings();
          });
      })

    // set up ghost url text field
    new Setting(containerEl)
      .setName('Ghost Url')
      .addTextArea(textArea => {
        const prevValue = this.plugin.settings.ghostUrl;
        textArea
          .setValue(prevValue)
          .onChange(async newValue => {
            this.plugin.settings.ghostUrl = newValue;
            await this.plugin.saveSettings();
          });
      })

    // set up ghost api version text field
    new Setting(containerEl)
      .setName('Ghost Api Version')
      .addTextArea(textArea => {
        const prevValue = this.plugin.settings.ghostApiVersion;
        textArea
          .setValue(prevValue)
          .onChange(async newValue => {
            this.plugin.settings.ghostApiVersion = newValue;
            await this.plugin.saveSettings();
          });
      })
  }
}

