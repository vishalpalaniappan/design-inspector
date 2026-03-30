import React, {useContext, useEffect, useState} from "react";

import PropTypes from "prop-types";
import {PlusSquare, Trash} from "react-bootstrap-icons";

import {useDalEngine} from "../../Providers/GlobalProviders";
import WorkspaceContext from "../../Providers/WorkspaceContext";

import "./Invariants.scss";

Invariants.propTypes = {
    close: PropTypes.func.isRequired,
};

/**
 * Invariants Info component.
 * @return {JSX.Element}
 */
export function Invariants ({close}) {
    const {engine} = useDalEngine();
    const {selectedBehavior} = useContext(WorkspaceContext);

    const addInvariant = () => {

    };

    const deleteInvariant = () => {

    };

    return (
        <div className="invariantsContainer">
            <div className="invariantsRow">
                <select className="selectInvariants"></select>
                <PlusSquare title={"Add Invariant"} onClick={addInvariant} className="icon"/>
                <Trash title={"Delete Invariant"} onClick={deleteInvariant} className="icon"/>
            </div>
            <div className="invariantsContent">
            </div>
        </div>
    );
}
