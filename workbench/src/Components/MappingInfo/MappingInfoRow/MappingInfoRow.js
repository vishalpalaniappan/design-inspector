import React, {useCallback, useEffect} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {selectAbstractionIdThunk} from "../../../Store/appThunk";

import "./MappingInfoRow.scss";

MappingInfoRow.propTypes = {
    abstraction: PropTypes.object.isRequired,
};

/**
 * MappingInfoRow Component
 * @param {string} uid - The unique identifier to display in the row
 * @return {JSX.Element}
 */
export function MappingInfoRow ({abstraction}) {
    const dispatch = useDispatch();

    const selectRow = useCallback(() => {
        if (abstraction.uid) {
            dispatch(selectAbstractionIdThunk(abstraction.uid));
        }
    }, [dispatch, abstraction]);

    return (
        <div className="mapping-row-info-container" onClick={selectRow}>
            <>
                {
                    abstraction?.type === "behavior" &&
                        <>
                            <div className="mapping-row-info-title">Mapped Source:</div>
                            <div className="mapping-row-info-value">{abstraction.source}</div>
                        </>
                }
                {
                    abstraction?.type === "participant" &&
                        <>
                            <div className="mapping-row-info-title">
                                Participant: {abstraction.participantName}
                            </div>
                            <div className="mapping-row-info-value">
                                Variable Name: {abstraction.variableName}
                            </div>
                        </>
                }
            </>
        </div>
    );
}
