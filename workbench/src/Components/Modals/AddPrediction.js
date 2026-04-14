import React, {useCallback, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {addParticipantThunk} from "../../Store/appThunk";
import {useSelectedBehavior} from "../../Store/useAppSelection";
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
    const selectedBehavior= useSelectedBehavior();
    const dispatch = useDispatch();
    const behaviors = useBehaviors();

    const [prediction, setPrediction] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const [chosenBehavior, setChosenBehavior] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {
        if (behaviors) {
            console.log("behaviors:", behaviors);
        }
    }, [behaviors]);

    const handleSubmit = useCallback(() => {
        if (prediction.trim() === "") {
            setError("Prediction must not be empty.");
            return;
        }
        try {
            dispatch(addParticipantThunk(prediction, description));
            close();
        } catch (err) {
            setError(err.toString());
        }
    }, [description, prediction, close, selectedBehavior, dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                close();
            } else if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
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
                    value={chosenBehavior}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                        e.stopPropagation();
                        setChosenBehavior(e.target.value);
                    }}
                >
                    {Object.entries(behaviors).map(([key, behavior]) => (
                        <option key={behavior._name} value={key}>
                            {behavior._name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="value-name-label">
                <span>Description:</span>
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
