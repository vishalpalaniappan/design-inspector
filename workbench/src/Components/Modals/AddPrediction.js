import React, {useCallback, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {addPredictionThunk} from "../../Store/appThunk";
import {useBehaviors} from "../../Store/useAppSelection";

import "./AddValue.scss";

AddPrediction.propTypes = {
    close: PropTypes.func.isRequired,
};

/**
 * Add Prediction modal body component.
 * @return {JSX.Element}
 */
export function AddPrediction ({close}) {
    const dispatch = useDispatch();
    const behaviors = useBehaviors();

    const [prediction, setPrediction] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (behaviors && Object.values(behaviors).length > 0) {
            setPrediction(Object.values(behaviors)[0].dal_engine_uid);
        }
    }, [behaviors]);

    const handleSubmit = useCallback(() => {
        if (!prediction) {
            setError("Prediction must not be empty.");
            return;
        }
        try {
            const behavior = behaviors.find((b) => b.dal_engine_uid === prediction);
            dispatch(addPredictionThunk(behavior, description));
            close();
        } catch (err) {
            setError(err.toString());
        }
    }, [description, prediction, close, dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                close();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [close, handleSubmit, prediction]);

    return (
        <div className="add-value-modal">
            <div className="value-name-label">
                <span>Behaviors:</span>
            </div>
            <div className="value-name-input">
                <select
                    value={prediction.dal_engine_uid}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                        e.stopPropagation();
                        setPrediction(e.target.value);
                    }}
                >
                    {Object.values(behaviors).map((behavior) => (
                        <option key={behavior.dal_engine_uid} value={behavior.dal_engine_uid}>
                            {behavior._name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="value-name-label">
                <span>Reason:</span>
            </div>
            <div className="value-name-input">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="invariant-name-submit">
                <button type="button" onClick={handleSubmit}>Add Prediction</button>
            </div>
            {error && (
                <div style={{float: "right"}} className="value-error">
                    {error}
                </div>
            )}
        </div>
    );
}
