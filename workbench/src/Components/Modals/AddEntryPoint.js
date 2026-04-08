import React, {useCallback, useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {useDalEngine} from "../../Providers/GlobalProviders";

import "./AddValue.scss";

AddEntryPoint.propTypes = {
    close: PropTypes.func.isRequired,
};

/**
 * Add Entry Point modal body component.
 * @return {JSX.Element}
 */
export function AddEntryPoint ({close}) {
    const dispatch = useDispatch();
    const {engine} = useDalEngine();

    const [entryPoint, setEntryPoint] = useState("");
    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (engine) {
            setEntryPoint(engine.implementation.getEntryPoint());
        }
    }, [engine]);

    const handleSubmit = useCallback(() => {
        if (entryPoint.trim() === "") {
            setError("Entry point must not be empty.");
            return;
        }
        try {
            engine.implementation.setEntryPoint(entryPoint);
            close();
        } catch (err) {
            setError(err.toString());
        }
    }, [dispatch, entryPoint, close, engine]);

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
    }, [close, handleSubmit]);

    return (
        <div className="add-value-modal">
            <div className="value-name-label">
                <span>Entry Point:</span>
            </div>
            <div className="value-name-input">
                <input ref={inputRef}
                    value={entryPoint}
                    onChange={(e) => setEntryPoint(e.target.value)}></input>
            </div>
            <div className="invariant-name-submit">
                <button type="button" onClick={handleSubmit}>Add Entry Point</button>
            </div>
            {error && (
                <div style={{float: "right"}} className="value-error">
                    {error}
                </div>
            )}
        </div>
    );
}
