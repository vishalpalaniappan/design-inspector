import React, {useContext, useEffect, useState} from "react";

import PropTypes from "prop-types";
import {Pencil} from "react-bootstrap-icons";

import {useDalEngine} from "../../../Providers/GlobalProviders";

import "./Invariant.scss";

Invariant.propTypes = {
    invariant: PropTypes.string,
};

/**
 * Invariant Info component.
 * @return {JSX.Element}
 */
export function Invariant ({invariant}) {
    const {engine} = useDalEngine();

    return (
        <div className="participantCard">
            <span>{invariant}</span>
            <Pencil title={"Edit Invariant"} className="icon"/>
        </div>
    );
}
