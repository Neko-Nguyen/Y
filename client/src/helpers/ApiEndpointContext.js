import { createContext } from "react";

const IS_LOCAL_SERVER = process.env.REACT_APP_IS_LOCAL_SERVER === 'true';
const LOCAL_API = process.env.REACT_APP_LOCAL_API;
const REMOTE_API = process.env.REACT_APP_REMOTE_API;
const api = IS_LOCAL_SERVER ? LOCAL_API : REMOTE_API;

export const ApiEndpointContext = createContext(api);