import React from "react";
import mockAxios from "jest-mock-axios";
import { render } from "foris/testUtils/customTestRender";

import AngelcamConnector from "../AngelcamConnector";

describe("<AngelcamConnector />", () => {
    it("should render component", () => {
        const { getByText } = render(<AngelcamConnector />);
        expect(getByText("Angelcam Connector")).toBeDefined();
        expect(mockAxios.get).toBeCalledWith("/reforis/angelcam-connector/api/uuid", expect.anything());
    });
});
