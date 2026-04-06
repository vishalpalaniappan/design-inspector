import React, {useCallback, useEffect} from "react";

import PropTypes from "prop-types";
import {Trash} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";

import {selectMappingThunk} from "../../../Store/appThunk";
import {deleteMappingThunk} from "../../../Store/appThunk";

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
            dispatch(selectMappingThunk(abstraction.uid));
        }
    }, [dispatch, abstraction]);

    const deleteMapping = useCallback((e) => {
        e.stopPropagation();
        dispatch(deleteMappingThunk(abstraction));
    }, [abstraction]);

    return (
        <div className="mapping-row-info-container" onClick={selectRow}>
            <div className="mapping-row-content">
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
                                Mapped Participant:
                            </div>
                            <div className="mapping-row-info-value" style={{marginBottom: "2px"}}>
                                Participant Name: {abstraction.participantName}
                            </div>
                            <div className="mapping-row-info-value">
                                Variable Name: {abstraction.variableName}
                            </div>
                        </>
                }
            </div>
            <div className="mapping-row-icon-column" onClick={deleteMapping}>
                <Trash/>
            </div>
        </div>
    );
}
