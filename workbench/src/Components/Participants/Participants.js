import React, {useCallback, useContext, useEffect, useState} from "react";

import PropTypes from "prop-types";
import {Geo, Pencil, Plus, PlusSquare, Trash} from "react-bootstrap-icons";
import {useModalManager} from "ui-layout-manager-dev";
import {useLayoutEventSubscription} from "ui-layout-manager-dev";

import {useDalEngine} from "../../Providers/GlobalProviders";
import WorkspaceContext from "../../Providers/WorkspaceContext";
import {AddParticipant} from "../Modals/AddParticipant";
import {Invariant} from "./Invariant/Invariant";

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
    const [participants, setParticipants] = useState([]);
    const {openModal} = useModalManager();

    useLayoutEventSubscription("engine:update", (event) => {
        if (selectedBehavior) {
            const behavior = engine.getNode(selectedBehavior).getBehavior();
            setParticipants([...behavior.participants]);
        }
    }, [engine, participants, setParticipants, selectedBehavior]);

    useEffect(() => {
        if (engine && selectedBehavior) {
            const behavior = engine.getNode(selectedBehavior).getBehavior();
            setParticipants(behavior.participants);
        }
    }, [selectedBehavior, engine]);

    const addParticipant = useCallback(() => {
        if (selectedBehavior) {
            openModal({
                title: "Add Participant",
                render: ({close}) => {
                    return <AddParticipant close={close} />;
                },
            });
        }
    }, [engine, selectedBehavior]);

    const deleteParticipant = () => {

    };

    return (
        <div className="participantsContainer">
            <div className="participantsRow">
                <select className="selectParticipants">
                    {participants.map((participant, index) => (
                        <option key={index}>{participant.name}</option>
                    ))}
                </select>
                <PlusSquare title={"Add Participant"} onClick={addParticipant} className="icon"/>
                <Trash title={"Delete Participant"} onClick={deleteParticipant} className="icon"/>
                <Geo title={"Participant Mapping"} className="icon"/>
            </div>
            <div className="participantsContent">
                <Invariant invariant={"Min String Length"}/>
                <Invariant invariant={"Max Size"}/>
                <div className="addInvariantPlaceholder">
                    <Plus title={"Add Invariant"} className="icon"/>
                    Add Invariant
                </div>
            </div>
        </div>
    );
}
