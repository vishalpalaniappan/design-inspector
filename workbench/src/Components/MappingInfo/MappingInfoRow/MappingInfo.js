import React from "react";

import PropTypes from "prop-types";

import "./MappingInfo.scss";

MappingInfoRow.propTypes = {
    uid: PropTypes.string,
    type: PropTypes.string
};

/**
 * MappingInfoRow Component
 * @param {string} uid - The unique identifier to display in the row
 * @return {JSX.Element}
 */
export function MappingInfoRow ({type, uid}) {
    return (
        <div className="mapping-row-info-container">
            <div className="mapping-row-info-title">{type} Abstraction ID:</div>
            <div className="mapping-row-info-value">{uid && uid}</div>
        </div>
    );
}
