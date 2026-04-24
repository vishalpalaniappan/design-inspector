import React, {useCallback, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {Floppy, Play} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";

import {useDalEngine} from "../../../Providers/GlobalProviders";
import {selectBehaviorThunk} from "../../../Store/appThunk";
import {setTransformOutput} from "../../../Store/scriptingSlice/scriptingSlice";
import {useScriptingBehaviors} from "../../../Store/scriptingSlice/useScriptingSelection";
import {useSelectedTransformationTest} from "../../../Store/scriptingSlice/useScriptingSelection";
import {useSelectedBehavior} from "../../../Store/useAppSelection";

import "./ScriptingToolBar.scss";

ScriptingToolBar.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object.isRequired,
};

/**
 * Initial World State Editor modal body component.
 * @return {JSX.Element}
 */
export function ScriptingToolBar () {
    const behavior = useSelectedBehavior();
    const {engine} = useDalEngine();
    const dispatch = useDispatch();
    const workerRef = useRef(null);
    const [result, setResult] = useState(null);
    const {behaviors} = useScriptingBehaviors();
    const [selectedBehavior, setSelectedBehavior] = useState(null);
    const selectedTransformationTest = useSelectedTransformationTest();

    useEffect(() => {
        if (behaviors.length > 0 && selectedBehavior) {
            console.log("Selected Behavior:", selectedBehavior);
            const behavior = behaviors.find((b) => b.dal_engine_uid === selectedBehavior);
            // TODO: Migrate thunk to use UID instead of behavior name, this
            // is a bad idea to use name as an identifier.
            if (behavior) {
                dispatch(selectBehaviorThunk(behavior.getName()));
            } else {
                console.warn(`Behavior with ID ${selectedBehavior} not found.`);
            }
        }
    }, [behaviors, selectedBehavior]);

    useEffect(() => {
        if (behaviors.length > 0 && !selectedBehavior) {
            setSelectedBehavior(behaviors[0].dal_engine_uid);
        }
    }, [behaviors]);

    const runTransformation = useCallback((e) => {
        // I decided to run transformations in worker for the current iteration.
        console.log(selectedTransformationTest);
        if (!selectedTransformationTest) return;
        if (!behavior) return;
        if (!engine) return;

        const _initialWorldState = JSON.parse(
            selectedTransformationTest.initialWorldState
        );
        const _expectedPostWorldState = JSON.parse(
            selectedTransformationTest.expectedPostWorldState
        );
        const _initialArgs = JSON.parse(
            selectedTransformationTest.initialArgs
        );
        const _primitives = behavior._primitives.join("\n");

        console.log("Running transformation with:", {
            _initialWorldState,
            _expectedPostWorldState,
            _initialArgs,
            _primitives,
        });
        engine.save();
        try {
            workerRef.current.postMessage({
                type: "RUN_TRANSFORMATION",
                payload: {
                    initialWorldState: _initialWorldState,
                    expectedPostWorldState: _expectedPostWorldState,
                    primitives: _primitives,
                    initialArgs: _initialArgs,
                },
            });
        } catch (error) {
            console.error("Error running transformation:", error);
        }
    }, [selectedTransformationTest, engine, behavior]);


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
        <div className="scriptingToolBar">
            <div className="scriptingToolBarLeft">
                <span>Select Behavior:</span>
                <select
                    value={selectedBehavior}
                    onChange={(e) => setSelectedBehavior(e.target.value)}>
                    {behaviors.map((behavior) => (
                        <option
                            key={behavior.dal_engine_uid}
                            value={behavior.dal_engine_uid}>
                            {behavior._name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="scriptingToolBarRight">
                <span>Compute Transformations</span>
                <Play
                    size={20}
                    style={{"color": "white", "cursor": "pointer"}}
                    onClick={runTransformation} />
            </div>
        </div>
    );
}
