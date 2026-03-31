import React, {useCallback, useContext, useEffect, useState} from "react";

import PropTypes from "prop-types";

import {useDalEngine} from "../../Providers/GlobalProviders";
import WorkspaceContext from "../../Providers/WorkspaceContext";

import "./AddValue.scss";

AddInvariant.propTypes = {
    close: PropTypes.func.isRequired,
};

/**
 * Add Invariant modal body component.
 * @param {props} props
 * @param {function} props.close - Function to close the modal,
 * provided by the modal manager.
 * @return {JSX.Element}
 */
export function AddInvariant ({close}) {
    const {selectedBehavior} = useContext(WorkspaceContext);
    const {engine} = useDalEngine();
    const [invariants, setInvariants] = useState([]);

    useEffect(() => {
        if (engine) {
            const invList = Object.keys(engine.invariant_types);
            setInvariants(invList);
        }
    }, [engine]);


    const handleSubmit = useCallback((event) => {
        event.preventDefault();
    });

    return (
        <div className="add-value-modal">
            <div className="value-name-label">
                <span>Invariants:</span>
            </div>
            <form className="value-name-input" onSubmit={handleSubmit}>
                <select>
                    {invariants.map((invariant) => (
                        <option key={invariant} value={invariant}>
                            {invariant}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
}
