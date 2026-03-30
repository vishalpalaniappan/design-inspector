import React, {useContext, useEffect, useState} from "react";

import PropTypes from "prop-types";

import { PlusSquare, Trash } from "react-bootstrap-icons";

import {useDalEngine} from "../../Providers/GlobalProviders";
import WorkspaceContext from "../../Providers/WorkspaceContext";

import "./Participants.scss";

Participants.propTypes = {
    close: PropTypes.func.isRequired,
};

/**
 * Participants Info component.
 * @return {JSX.Element}
 */
export function Participants ({close}) {
    const {engine} = useDalEngine();
    const {selectedBehavior} = useContext(WorkspaceContext);


    const addParticipant = () => {

    };

    const deleteParticipant = () => {
        
    };

    return (
        <div className="participantsContainer">
            <div className="participantsRow">
                <select className="selectParticipants"></select>
                <PlusSquare title={"Add Participant"} onClick={addParticipant} className="icon"/>
                <Trash title={"Delete Participant"} onClick={deleteParticipant} className="icon"/>
            </div>
            <div className="participantsContent"></div>
        </div>
    );
}
