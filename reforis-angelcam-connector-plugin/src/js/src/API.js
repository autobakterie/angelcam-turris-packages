import { REFORIS_URL_PREFIX } from "foris";

const API_URL_PREFIX = `${REFORIS_URL_PREFIX}/angelcam-connector/api`;

const API_URLs = new Proxy(
    {
        uuid: "/uuid",
        status: "/status",
        logs: "/logs",
    },
    {
        get: (target, name) => `${API_URL_PREFIX}${target[name]}`,
    },
);

export default API_URLs;
