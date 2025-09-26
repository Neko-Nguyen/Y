const { IS_LOCAL_SERVER, LOCAL_STORAGE, REMOTE_STORAGE } = require("./Constants");

const storage = IS_LOCAL_SERVER ? LOCAL_STORAGE : REMOTE_STORAGE;

module.exports = { storage };