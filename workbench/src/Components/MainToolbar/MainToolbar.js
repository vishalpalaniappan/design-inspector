/* eslint-disable max-len */
import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

import "./MainToolbar.scss";

MainToolbar.propTypes = {
};

/**
 * Main Tool Bar component.
 * @return {JSX.Element}
 */
export function MainToolbar () {
    const dispatch = useDispatch();

    /**
     * Rathern than maintaing a separate toolbar for each layout, I will
     * use this component to render the relevant tool bar. This also means
     * that this component will contain the application level keyboard
     * shortcuts for saving, running etc, which will be common across all layouts.
     * This will also be the place to add any application level buttons like
     * settings, help etc.
     */

    return (
        <div className="mainToolBar">
            <div className="mainToolBarLeft">
                <div className="mainToolBarGroup"></div>
                <div className="mainToolBarGroup"></div>
            </div>
            <div className="mainToolBarRight"></div>
        </div>
    );
}
