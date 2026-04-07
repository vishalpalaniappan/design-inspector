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
                            <div className="file">Design 1</div>
                            <div className="file">Design 2</div>
                            <div className="file">Design 3</div>
                            <div className="file">Design 1</div>
                            <div className="file">Design 2</div>
                            <div className="file">Design 3</div>
                            <div className="file">Design 1</div>
                            <div className="file">Design 2</div>
                            <div className="file">Design 3</div>
                            <div className="file">Design 1</div>
                            <div className="file">Design 2</div>
                            <div className="file">Design 3</div>
                        </div>
                    </div>
                    <div className="button-row">
                        <div className="open-btn">
                            <PlusSquare />
                        </div>
                        <div className="open-btn">
                            <Trash />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
