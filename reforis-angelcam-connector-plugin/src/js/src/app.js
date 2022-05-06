import AngelcamConnector from "./AngelcamConnector/AngelcamConnector";

const AngelcamConnectorPlugin = {
    name: _("Angelcam Connector"),
    weight: 100,
    submenuId: "angelcam-connector",
    path: "/angelcam-connector",
    component: AngelcamConnector,
    icon: "cube",
};

ForisPlugins.push(AngelcamConnectorPlugin);
