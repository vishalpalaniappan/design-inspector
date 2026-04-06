import React, {useCallback, useEffect} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import {setSelectedAbstractionId} from "../../../Store/appSlice";
import {incrementCounter} from "../../../Store/appSlice";

import "./MappingInfoRow.scss";

MappingInfoRow.propTypes = {
    uid: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
};

/**
 * MappingInfoRow Component
 * @param {string} uid - The unique identifier to display in the row
 * @return {JSX.Element}
 */
export function MappingInfoRow ({type, uid, value}) {
    const dispatch = useDispatch();

    const selectRow = useCallback(() => {
        if (uid) {
            dispatch(setSelectedAbstractionId(uid));
            dispatch(incrementCounter());
        }
    }, [dispatch, uid]);

    return (
        <div className="mapping-row-info-container" onClick={selectRow}>
            <div className="mapping-row-info-title">{type} Abstraction ID:</div>
            <div className="mapping-row-info-value">{uid && uid}</div>
            {value &&
                <>
                    <div style={{marginTop: "8px"}}></div>
                    <div className="mapping-row-info-title">Variable Name:</div>
                    <div className="mapping-row-info-value">{value}</div>
                </>
            }
        </div>
    );
}
