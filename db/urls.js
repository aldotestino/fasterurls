const db = require('./connection');
const urlShcema = require('./urlSchema');

const urls = db.get('urls');
urls.createIndex({ alias: 1 }, { unique: true });

/**
 * @param {string} alias 
 */
async function getURL(alias) {
  const url = await urls.findOne({ alias });
  if (!url) {
    const err = new Error(`Alias "${alias}" is invalid!`);
    err.status = 404;
    throw err;
  }
  return url;
}

/**
 * @param {Object} url 
 */
async function createURL(url) {
  try {
    const validated = await urlShcema.validateAsync(url);
    const inserted = await urls.insert(validated);
    return inserted;
  } catch (err) {
    if (err.message.startsWith('E11000')) {
      err.message = `Alias "${url.alias}" already exists!`;
      err.status = 409;
    }
    throw err;
  }
}

module.exports = {
  getURL,
  createURL
};