import React, {useCallback} from "react";

import {LayoutManager} from "ui-layout-manager-dev";

import layout from "../../layout.json";
import {registry} from "../../Registry";
import {useDesignLoaded} from "../../Store/useAppSelection";
import {LoadDesign} from "./LoadDesign/LoadDesign";

import "./LandingPage.scss";

/**
 * Landing page for the design workbench. Renders the workbench
 * if a design is loaded, if not presents a page to load, create
 * or delete a design from the server.
 * @return {JSX.Element}
 */
export function LandingPage () {
    const designLoaded = useDesignLoaded();

    const registryList = useCallback(() => registry, []);

    return (
        <>
            {
                designLoaded?
                    <LayoutManager registry={registryList()} ldf={layout} /> :
                    <LoadDesign />
            }
        </>
    );
}
