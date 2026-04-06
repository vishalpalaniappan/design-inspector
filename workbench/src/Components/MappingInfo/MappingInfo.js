import React, {useEffect} from "react";

import {useSelectedBehavior} from "../../Store/useAppSelection";
import {useSelectedParticipant} from "../../Store/useAppSelection";
import {useSelectedBehaviorAbstractions} from "../../Store/useAppSelection";
import {MappingInfoRow} from "./MappingInfoRow/MappingInfoRow";

import "./MappingInfo.scss";

/**
 * MappingInfo Component
 * @return {JSX.Element}
 */
export function MappingInfo () {
    const selectedBehavior = useSelectedBehavior();
    const selectedParticipant = useSelectedParticipant();
    const selectedBehaviorAbstractions = useSelectedBehaviorAbstractions();

    useEffect(() => {
        console.log("Selected behavior abstractions:", selectedBehaviorAbstractions);
    }, [selectedBehaviorAbstractions]);
    return (
        <div className="mapping-container">
            {selectedBehavior && selectedBehavior._abstractionIds.map((abstractionId) => {
                return (
                    <MappingInfoRow
                        key={abstractionId}
                        type={"Behavior"}
                        uid={abstractionId}
                    />
                );
            })}
            {(selectedParticipant && selectedParticipant._abstractionId) &&
                <MappingInfoRow
                    key={selectedParticipant._abstractionId.abstractionId}
                    type={"Participant"}
                    value={selectedParticipant._abstractionId.variableName}
                    uid={selectedParticipant._abstractionId.abstractionId}
                />
            }
        </div>
    );
}
