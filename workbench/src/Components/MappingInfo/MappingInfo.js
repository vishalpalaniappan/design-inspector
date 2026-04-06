import React, {useCallback, useEffect} from "react";

import {useSelectedBehaviorAbstractions} from "../../Store/useAppSelection";
import {MappingInfoRow} from "./MappingInfoRow/MappingInfoRow";

import "./MappingInfo.scss";

/**
 * MappingInfo Component
 * @return {JSX.Element}
 */
export function MappingInfo () {
    const selectedBehaviorAbstractions = useSelectedBehaviorAbstractions();

    const getRowData = useCallback(() => {
        if (!selectedBehaviorAbstractions) return [];
        return selectedBehaviorAbstractions.map((abstraction) => {
            return <MappingInfoRow
                key={abstraction.uid + "_" + abstraction.type}
                abstraction={abstraction}
            />;
        });
    }, [selectedBehaviorAbstractions]);

    return (
        <div className="mapping-container">
            {getRowData()}
        </div>
    );
}
