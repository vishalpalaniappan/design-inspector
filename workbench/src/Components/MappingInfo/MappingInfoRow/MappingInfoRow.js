import React from "react";

import PropTypes from "prop-types";

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
    return (
        <div className="mapping-row-info-container">
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
