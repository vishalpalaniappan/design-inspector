import React, {useCallback} from "react";

import PropTypes from "prop-types";
import {Trash} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";

import {setSelectedInvariant} from "../../../Store/appSlice";
import {deleteInvariantThunk} from "../../../Store/appThunk";
import {useSelectedInvariant} from "../../../Store/useAppSelection";

import "./Invariant.scss";

Invariant.propTypes = {
    invariant: PropTypes.object.isRequired,
};

/**
 * Invariant Info component.
 * @return {JSX.Element}
 */
export function Invariant ({invariant}) {
    const dispatch = useDispatch();

    const selectedInvariant = useSelectedInvariant();

    const deleteInvariant = useCallback((e) => {
        e.stopPropagation();
        if (invariant) {
            dispatch(deleteInvariantThunk(invariant.getName()));
        }
    }, [invariant]);

    const selectInvariant = useCallback((e) => {
        e.stopPropagation();
        if (invariant) {
            dispatch(setSelectedInvariant(invariant.getName()));
        }
    }, [invariant, dispatch]);

    return (
        <div className={`participantCard ${selectedInvariant === invariant ? "selected" : ""}`}
            onClick={selectInvariant}>
            <span>{invariant.getName()}</span>
            <div className="icons">
                <Trash title={"Delete Invariant"} onClick={deleteInvariant} className="icon"/>
            </div>
        </div>
    );
}
