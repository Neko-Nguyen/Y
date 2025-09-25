import { createContext, useContext } from "react";
import { IS_LOCAL_SERVER, LOCAL_API, REMOTE_API } from "./Constants";

const api = IS_LOCAL_SERVER ? LOCAL_API : REMOTE_API;

export const ApiEndpointContext = createContext(api);