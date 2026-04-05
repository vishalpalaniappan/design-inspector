import React, {useCallback, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {useDalEngine} from "../../Providers/GlobalProviders";
import {useSelectedParticipant} from "../../Store/useAppSelection";

import "./AddValue.scss";

MapParticipant.propTypes = {
    close: PropTypes.func.isRequired,
    args: PropTypes.object
};

/**
 * Map Participant modal body component.
 * @return {JSX.Element}
 */
export function MapParticipant ({close, args}) {
    const {engine} = useDalEngine();

    const dispatch = useDispatch();
    const selectedParticipant = useSelectedParticipant();

    const [variableName, setVariableName] = useState("");
    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (selectedParticipant) {
            // TODO: I should use a getter and it shouldn't be abstraction id,
            // I'm just working with what I have setup in the engine.
            const p = selectedParticipant;
            if (p._abstractionId && p._abstractionId?.variableName) {
                setVariableName(p._abstractionId.variableName);
            }
        }
    }, [selectedParticipant]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [engine]);

    const handleSubmit = useCallback(() => {
        if (variableName.trim() === "") {
            setError("Variable name must not be empty.");
            return;
        }
        try {
            selectedParticipant.mapAbstraction({
                abstractionId: args.abstraction.uid,
                variableName: variableName,
            });
            close();
        } catch (err) {
            setError(err.toString());
        }
    }, [engine, variableName, close, dispatch, selectedParticipant, args]);

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
    }, [close, variableName, handleSubmit]);

    return (
        <div className="add-value-modal">
            <div className="value-name-label">
                <span>Variable Name:</span>
            </div>
            <div className="value-name-input">
                <input ref={inputRef}
                    value={variableName}
                    onChange={(e) => setVariableName(e.target.value)}></input>
            </div>
            <div className="invariant-name-submit">
                <button type="button" onClick={handleSubmit}>Set Variable Name</button>
            </div>
            {error && (
                <div style={{float: "right"}} className="value-error">
                    {error}
                </div>
            )}
        </div>
    );
}
