import React, {useCallback, useEffect} from "react";

import {Floppy, PlayFill, PlusSquare} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {useModalManager} from "ui-layout-manager-dev";

import {useDalEngine} from "../../Providers/GlobalProviders";
import {useServer} from "../../Providers/GlobalProviders";
import {setStatusMsg} from "../../Store/appSlice";
import {setHasEntryPointThunk} from "../../Store/appThunk";
import {useHasEntryPoint} from "../../Store/useAppSelection";
import {AddBehavior} from "../Modals/AddBehavior";

import "./ToolBar.scss";

/**
 * Toolbar Component
 * @return {JSX.Element}
 */
export function ToolBar () {
    const {openModal} = useModalManager();
    const {engine} = useDalEngine();
    const dispatch = useDispatch();
    const {sendJsonMessage} = useServer();
    const hasEntryPoint = useHasEntryPoint();

    useEffect(() => {
        if (engine) {
            const entryPoint = engine.implementation.getEntryPoint();
            dispatch(setHasEntryPointThunk(Boolean(entryPoint)));
        }
    }, [engine, dispatch]);

    const saveGraph = useCallback(() => {
        if (engine) {
            engine.save();
            dispatch(setStatusMsg("Saving design..."));
        }
    }, [engine, dispatch]);

    const addBehavior = () => {
        openModal({
            title: "Add Behavior",
            render: ({close}) => {
                return <AddBehavior close={close} />;
            },
        });
    };

    const runDesign = useCallback(() => {
        if (sendJsonMessage && engine) {
            const failureMsg = "Failed to run design. Please ensure an entry point is set.";
            const cmd = (hasEntryPoint)?
                engine.implementation.getEntryPoint():
                `echo "${failureMsg}"`;
            sendJsonMessage({
                type: "terminal_input",
                data: cmd + "\n",
            });
        }
    }, [sendJsonMessage, hasEntryPoint, engine]);

    return (
        <div className="toolbarWrapper">
            <div className="toolbarContainer">
                <PlusSquare
                    onClick={(e) => addBehavior()}
                    title="Add Behavior"
                    className="icon"
                />
            </div>
            <div className="toolbarContainer bottom">
                <PlayFill
                    size={20}
                    style={{color: hasEntryPoint ? "#4f9160" : "grey"}}
                    onClick={(e) => runDesign()}
                    title="Run Design"
                    className="icon"
                />
                <Floppy
                    onClick={(e) => saveGraph()}
                    title="Save Graph"
                    className="icon"
                />
            </div>
        </div>
    );
}
