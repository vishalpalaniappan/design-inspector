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
    const [participant, setParticipant] = useState(null);
    const {openModal} = useModalManager();

    useLayoutEventSubscription("participants:update", (event) => {
        if (selectedBehavior) {
            updateParticipants(event.payload);
        }
    }, [engine, participants, setParticipants, selectedBehavior]);

    useEffect(() => {
        if (engine && selectedBehavior) {
            updateParticipants();
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

    const deleteParticipant = useCallback(() => {
        if (engine && selectedBehavior && participant) {
            const behavior = engine.getNode(selectedBehavior).getBehavior();
            behavior.removeParticipant(participant);
            updateParticipants();
        }
    }, [engine, selectedBehavior, participant]);

    /**
     * Given the selected behavior, it sets the participants and
     * selects the last participant in the list. If there are no
     * participants, it sets the selected participant to null.
     */
    const updateParticipants = useCallback((participantName) => {
        if (selectedBehavior) {
            const behavior = engine.getNode(selectedBehavior).getBehavior();
            const _participants = behavior.getParticipants();
            setParticipants([..._participants]);
            if (_participants.length > 0 && participantName) {
                setParticipant(participantName);
            } else if (_participants.length > 0) {
                setParticipant(_participants[_participants.length - 1].getName());
            } else {
                setParticipant(null);
            }
        }
    }, [engine, participants, setParticipants, selectedBehavior]);

    return (
        <>
            {
                selectedBehavior &&
                <div className="participantsContainer">
                    <div className="participantsTitle">
                        Participants
                    </div>
                    <div className="participantsRow">
                        <select className="selectParticipants" 
                            value={participant}
                            onChange={(e) => setParticipant(e.target.value)}>
                            {(participants && participants.length > 0) && 
                            participants.map((participant, index) => (
                                <option key={index}>{participant.getName()}</option>
                            ))}
                        </select>
                        <PlusSquare title={"Add Participant"}
                            onClick={addParticipant}
                            className="icon"/>
                        <Trash title={"Delete Participant"}
                            onClick={deleteParticipant}
                            className="icon"/>
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
            }
        </>
    );
}
