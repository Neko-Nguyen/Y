import { config } from "../config";

const IS_LOCAL_SERVER = config.isLocalServer === 'true';
const LOCAL_STORAGE = config.localStorage;
const REMOTE_STORAGE = config.remoteStorage;

export const storage = IS_LOCAL_SERVER ? LOCAL_STORAGE : REMOTE_STORAGE;