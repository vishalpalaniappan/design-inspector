import React, {useCallback, useEffect, useState} from "react";

import {useDispatch} from "react-redux";
import {LayoutManager} from "ui-layout-manager-dev";

import debuggingLayout from "../../debuggingLayout.json";
import designLayout from "../../designLayout.json";
import {registry} from "../../Registry";
import scriptingLayout from "../../scriptingLayout.json";
import {setDesignLoaded} from "../../Store/appSlice";
import {setDesignMode, setScriptingMode} from "../../Store/appSlice";
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

    // Ready is used to prevent useEffect from running on initial
    // render and overwriting the URL params. This allows us to
    // set the initial app mode from the URL params and fallback
    // to design mode if no mode url param is provided.
    const [ready, setReady] = useState(false);

    const appMode = useAppMode();
    const dispatch = useDispatch();

    const [chosenLayout, setChosenLayout] = useState(designLayout);

    const registryList = useCallback(() => registry, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const designMode = params.get("mode");
        if (designMode && designMode === "scripting") {
            dispatch(setScriptingMode());
        } else if (designMode && designMode === "design") {
            dispatch(setDesignMode());
        }
        setReady(true);
    }, [dispatch]);

    useEffect(() => {
        if (!ready) return;
        const params = new URLSearchParams(window.location.search);
        if (appMode === 1) {
            dispatch(setDesignLoaded(false));
            setChosenLayout(designLayout);
            params.set("mode", "design");
        } else if (appMode === 2) {
            dispatch(setDesignLoaded(false));
            setChosenLayout(scriptingLayout);
            params.set("mode", "scripting");
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, "", newUrl);
    }, [appMode, ready, dispatch]);

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
