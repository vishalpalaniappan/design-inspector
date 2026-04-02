import React, {useCallback, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {useDalEngine} from "../../Providers/GlobalProviders";
import {setSelectedBehavior} from "../../Store/appSlice";

import "./AddValue.scss";

AddBehavior.propTypes = {
    close: PropTypes.func.isRequired,
};

/**
 * Add Behavior modal body component.
 * @return {JSX.Element}
 */
export function AddBehavior ({close}) {
    const {engine} = useDalEngine();

    const dispatch = useDispatch();

    const [behavior, setBehavior] = useState("");
    const [error, setError] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [engine]);

    const handleSubmit = useCallback(() => {
        if (behavior.trim() === "") {
            setError("Behavior name must not be empty.");
            return;
        }
        try {
            engine.getNode(behavior);
            setError(`Behavior with name "${behavior}" already exists.`);
        } catch (error) {
            engine.addNode(behavior, []);
            dispatch(setSelectedBehavior(behavior));
            setTimeout(() => {
                close();
            }, 0);
        }
    }, [engine, behavior, close, dispatch]);

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
    }, [close, behavior]);

    return (
        <div className="add-value-modal">
            <div className="value-name-label">
                <span>Behavior Name:</span>
            </div>
            <div className="value-name-input">
                <input
                    ref={inputRef}
                    value={behavior}
                    onChange={(e) => setBehavior(e.target.value)}/>
                <div className="value-name-submit">
                    <button type="button" onClick={handleSubmit}>Add Behavior</button>
                </div>
            </div>
            {error &&
                <div className="value-error">{error}</div>
            }
        </div>
    );
}
