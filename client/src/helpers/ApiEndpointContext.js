import { createContext } from "react";
import { config } from "../config";

const IS_LOCAL_SERVER = config.isLocalServer === 'true';
const LOCAL_API = config.localAPI;
const REMOTE_API = process.env.REACT_APP_REMOTE_API;
const api = IS_LOCAL_SERVER ? LOCAL_API : REMOTE_API;

export const ApiEndpointContext = createContext(api);