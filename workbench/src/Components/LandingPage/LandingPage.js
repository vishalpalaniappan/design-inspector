import React, {useCallback, useEffect, useState} from "react";

import {useDispatch} from "react-redux";
import {LayoutManager} from "ui-layout-manager-dev";

import layout from "../../layout.json";
import layout2 from "../../layout2.json";
import {registry} from "../../Registry";
import {setDesignLoaded} from "../../Store/appSlice";
import {useDesignLoaded} from "../../Store/useAppSelection";
import {useAppMode} from "../../Store/useAppSelection";
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

    const appMode = useAppMode();
    const dispatch = useDispatch();

    const [chosenLayout, setChosenLayout] = useState(layout);

    const registryList = useCallback(() => registry, []);

    useEffect(() => {
        if (appMode === 1) {
            dispatch(setDesignLoaded(false));
            setChosenLayout(layout);
        } else if (appMode === 2) {
            dispatch(setDesignLoaded(false));
            setChosenLayout(layout2);
        }
    }, [appMode]);

    return (
        <>
            {
                designLoaded?
                    <LayoutManager registry={registryList()} ldf={chosenLayout} /> :
                    <LoadDesign />
            }
        </>
    );
}
