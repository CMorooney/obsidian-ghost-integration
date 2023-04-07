import { Notice, Plugin, TAbstractFile, TFile } from 'obsidian';
import { PluginSettings, DEFAULT_SETTINGS } from 'src/settings/settings';
import { GhostPostMetadata } from 'src/api/models';
import { uploadPost } from 'src/api/api';

export default class GhostIntegrationPlugin extends Plugin {
  settings: PluginSettings;

  async onload() {
    await this.loadSettings();

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file: TAbstractFile) => {
        const actualFile = file as TFile;
        if (!actualFile) {
          new Notice("unable to read file");
          return;
        }

        menu.addItem((item) => {
          item
            .setTitle("Publish to Ghost")
            .setIcon("ghost")
            .onClick(async () => {
              //todo: loading
              try {
                const metadata = await this.parseFileMetadata(actualFile);
                if(metadata) {
                  await this.uploadPostInternal(metadata, actualFile);
                } else {
                  throw new Error("unexpected error reading metadata. make sure you have the title, tags, and status (draft|published) defined");
                }
              } catch(e) {
                new Notice(e.message);
              }
            });
        });
      })
    );
  }

  async parseFileMetadata(file: TFile): Promise<GhostPostMetadata> {
    const fileManager = this.app.fileManager;
    return new Promise((accept, reject) => {
      fileManager.processFrontMatter(file, async (data: any) => {
        const metaData = data as GhostPostMetadata;
        if (!metaData) {
          reject("Metdata incomplete. Required: title, tags (comma separated list), status (published|draft)");
        } else {
          accept(metaData);
        }
      });
    });
  }

  async uploadPostInternal(metadata: GhostPostMetadata, file: TFile) {
    uploadPost(metadata, file, this.settings);
  }

  onunload() { }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

