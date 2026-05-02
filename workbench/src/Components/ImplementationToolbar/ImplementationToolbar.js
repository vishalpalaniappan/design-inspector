/* eslint-disable max-len */
import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import "./ImplementationToolbar.scss";

ImplementationToolbar.propTypes = {
};

/**
 * Implementation Tool Bar component.
 * @return {JSX.Element}
 */
export function ImplementationToolbar () {
    const dispatch = useDispatch();

    return (
        <div className="implementationToolBar">
            <div className="implementationToolBarLeft">
                <div className="implementationToolBarGroup"></div>
                <div className="implementationToolBarGroup"></div>
            </div>
            <div className="implementationToolBarRight"></div>
        </div>
    );
}
