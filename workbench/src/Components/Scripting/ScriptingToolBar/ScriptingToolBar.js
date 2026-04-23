import React, {useCallback, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {Floppy, Play} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";

import {setTransformOutput} from "../../../Store/scriptingSlice/scriptingSlice";
import {useScripts} from "../../../Store/scriptingSlice/useScriptingSelection";

InitialWorldStateEditor.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Initial World State Editor modal body component.
 * @return {JSX.Element}
 */
export function ScriptingToolBar () {
    const dispatch = useDispatch();
    const {scripts} = useScripts();
    const workerRef = useRef(null);
    const [result, setResult] = useState(null);

    const runTransformation = useCallback((e) => {
        // I decided to run transformations in worker for the current iteration.
        console.log(scripts);
        if (!scripts?.initialArgs) return;
        if (!scripts?.expectedPostWorldState) return;
        if (!scripts?.primitives) return;
        if (!scripts?.initialWorldState) return;

        const _initialWorldState = JSON.parse(scripts.initialWorldState);
        const _expectedPostWorldState = JSON.parse(scripts.expectedPostWorldState);
        const _initialArgs = JSON.parse(scripts.initialArgs);
        try {
            workerRef.current.postMessage({
                type: "RUN_TRANSFORMATION",
                payload: {
                    initialWorldState: _initialWorldState,
                    expectedPostWorldState: _expectedPostWorldState,
                    primitives: scripts.primitives,
                    initialArgs: _initialArgs,
                },
            });
        } catch (error) {
            console.error("Error running transformation:", error);
        }
    }, [scripts]);


    useEffect(() => {
        workerRef.current = new Worker(
            new URL("./ScriptingWorker.js", import.meta.url),
            {type: "module"}
        );

        workerRef.current.onmessage = (event) => {
            setResult(event.data);
            if (event.data.type === "Success") {
                console.log("Transformation result:", event.data.payload);
                dispatch(setTransformOutput(event.data.payload.updatedWorldState));
            } else if (event.data.type === "Error") {
                console.error("Transformation error:", event.data.payload.error);
            }
        };

        return () => {
            workerRef.current.terminate();
        };
    }, []);

    return (
        // eslint-disable-next-line max-len
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            paddingLeft: "10px",
            gap: "10px",
            color: "white",
            alignItems: "center"}}>
            <span>Select Behavior:</span>
            <select>
                <option value="behavior1">Behavior 1</option>
                <option value="behavior2">Behavior 2</option>
                <option value="behavior3">Behavior 3</option>
            </select>
            <span>Compute Transformations</span>
            <Play
                size={20}
                style={{"color": "white", "cursor": "pointer"}}
                onClick={runTransformation} />
        </div>
    );
}
