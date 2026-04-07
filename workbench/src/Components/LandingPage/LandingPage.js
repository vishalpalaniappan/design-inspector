import React, { useContext, useEffect, useRef, useState } from "react";

import splashScreen from "../../Assets/splash_screen.png";

import { PlusSquare, Trash } from "react-bootstrap-icons";

import "./LandingPage.scss";

/**
 * Landing page of the viewer component.
 * @return {JSX.Element}
 */
export function LandingPage() {
    return (
        <div className="landing-page">
            <div className="splash">
                <div className="left">
                    <img src={splashScreen} alt="Blueprint city" />
                </div>
                <div className="right">
                    <div className="title-container">
                        Design Workbench
                    </div>
                    <div className="subtitle">Select Design</div>
                    <div className="file-selector-container">
                        <div className="files">
                            <div className="file">Library Manager</div>
                            <div className="file">Bubble Sort</div>
                            <div className="file">Ticketing System</div>
                            <div className="file">Render Farm</div>
                        </div>
                    </div>
                    <div className="button-row">
                        <div className="buttons-left">
                            <div className="icon-btn">
                                <PlusSquare />
                            </div>
                            <div className="icon-btn">
                                <Trash />
                            </div>
                        </div>
                        <div className="buttons-right">
                            <span className="open-button">Open Design</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
