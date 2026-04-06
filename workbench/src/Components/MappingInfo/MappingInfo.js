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
    const selectedBehaviorAbstractions = useSelectedBehaviorAbstractions();

    useEffect(() => {
        console.log("Selected behavior abstractions:", selectedBehaviorAbstractions);
    }, [selectedBehaviorAbstractions]);
    return (
        <div className="mapping-container">
            {selectedBehaviorAbstractions && selectedBehaviorAbstractions.map((abstraction) => {
                return (
                    <MappingInfoRow
                        key={abstraction.uid}
                        type={""}
                        uid={abstraction.value}
                    />
                );
            })}
        </div>
    );
}
