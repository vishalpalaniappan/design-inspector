import React, {useContext, useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import {useLayoutEventPublisher} from "ui-layout-manager-dev";

import {useDalEngine} from "../../../Providers/GlobalProviders";

import "./AddBehavior.scss";

AddBehavior.propTypes = {
    close: PropTypes.func.isRequired,
};

/**
 * Add Behavior modal body component.
 * @return {JSX.Element}
 */
export function AddBehavior ({close}) {
    const {engine} = useDalEngine();
    const [behavior, setBehavior] = useState("");
    const inputRef = useRef(null);

    const publish = useLayoutEventPublisher();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [engine]);

    const handleSubmit = (event) => {
        event.preventDefault(); // stops page refresh
        if (behavior.trim() === "") {
            return;
        }
        publish({
            type: "add:behavior",
            payload: behavior,
            source: "add-behavior-modal",
        });
        close();
    };

    return (
        <div className="add-behavior-modal">
            <div className="behavior-name-label">
                <span>Behavior Name:</span>
            </div>
            <form className="behavior-name-input" onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    value={behavior}
                    onChange={(e) => setBehavior(e.target.value)}/>
                <div className="behavior-name-submit">
                    <button type="submit">Add Behavior</button>
                </div>
            </form>
        </div>
    );
}
