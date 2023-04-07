import { GhostAdminAPI } from '@tryghost/admin-api';
import { GhostPostMetadata } from '../api/models';
import { PluginSettings } from '../settings/settings';

const path = require('path');

const createClient = (settings: PluginSettings): GhostAdminAPI =>
  new GhostAdminAPI({
    url: settings.ghostUrl,
    key: settings.ghostApiKey,
    version: settings.ghostApiVersion
  });

// uploads post and any embedded images
export const uploadPost = async (metadata: GhostPostMetadata, html: string, settings: PluginSettings) => {
  const client = createClient(settings);
  const newHtml = await uploadPostImages(client, html);
  await client.posts
    .add(
      {
        title: metadata.title,
        html: newHtml,
        status: metadata.status,
        tags: metadata.tags
      },
      { source: 'html' } // Tell the API to use HTML as the content source, instead of mobiledoc
    );
};

// uploads images in the html and replaces the links in that html with the new uploaded destination
const uploadPostImages = async (client: GhostAdminAPI, html: string) => {
  // Find images that Ghost Upload supports
  // TODO: filter out anything already uploaded to ghost
  let imageRegex = /="([^"]*?(?:\.jpg|\.jpeg|\.gif|\.png|\.svg|\.sgvz))"/gmi;
  let imagePromises = [];
  let result;

  while ((result = imageRegex.exec(html)) !== null) {
    let file = result[1];
    // Upload the image, using the original matched filename as a reference
    imagePromises.push(client.images.upload({
      ref: file,
      file: path.resolve(file)
    }));
  }

  return Promise
    .all(imagePromises)
    .then(images => {
      images.forEach(image => html = html.replace(image.ref, image.url));
      return html;
    });
}
