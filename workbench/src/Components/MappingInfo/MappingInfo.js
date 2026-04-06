import React, { useEffect } from "react";

import {useSelectedBehavior} from "../../Store/useAppSelection";
import {useSelectedParticipant} from "../../Store/useAppSelection";
import {MappingInfoRow} from "./MappingInfoRow/MappingInfo";

import "./MappingInfo.scss";

/**
 * MappingInfo Component
 * @return {JSX.Element}
 */
export function MappingInfo () {
    const selectedBehavior = useSelectedBehavior();
    const selectedParticipant = useSelectedParticipant();

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
        </div>
    );
}
