import { GhostPostMetadata, GhostPost } from '../api/models';
import { PluginSettings } from '../settings/settings';

const GhostAdminAPI = require('@tryghost/admin-api');
const path = require('path');

const createClient = (settings: PluginSettings): typeof GhostAdminAPI =>
  new GhostAdminAPI({
    url: settings.ghostUrl,
    key: settings.ghostApiKey,
    version: settings.ghostApiVersion,
    userAgent: false
  });

// uploads post and any embedded images
export const uploadPost = async (metadata: GhostPostMetadata, html: string, settings: PluginSettings): Promise<GhostPost> => {
  const client = createClient(settings);
  const newHtml = await uploadPostImages(client, html, settings);

  const updatedPostData = {
    title: metadata.title,
    html: newHtml,
    status: metadata.status,
    tags: metadata.tags,
    url: settings.ghostUrl,
    version: settings.ghostApiVersion,
    key: settings.ghostApiKey
  };

  if (metadata.id) {
    return await client.posts
      .edit(
        {
          ...updatedPostData,
          id: metadata.id,
          updated_at: new Date().toISOString(),
        },
        { source: 'html' }
      );
  }
  else {
    return await client.posts
      .add(
        updatedPostData,
        { source: 'html' }
      );
  }
};

// uploads images in the html and replaces the links in that html with the new uploaded destination
const uploadPostImages = async (client: typeof GhostAdminAPI, html: string, settings: PluginSettings) => {
  // Find images that Ghost Upload supports
  // TODO: filter out anything already uploaded to ghost
  let imageRegex = /="([^"]*?(?:\.jpg|\.jpeg|\.gif|\.png|\.svg|\.sgvz))"/gmi;
  let imagePromises = [];
  let result;

  while ((result = imageRegex.exec(html)) !== null) {
    let file = result[1];
    // don't upload something that has already been uploaded to ghost url saved in settings
    if (file.contains(settings.ghostUrl)) continue;

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
