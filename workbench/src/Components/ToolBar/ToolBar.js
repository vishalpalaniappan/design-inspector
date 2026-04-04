import React, {useCallback} from "react";

import {Floppy, PlusSquare} from "react-bootstrap-icons";
import {useLayoutEventPublisher} from "ui-layout-manager-dev";
import {useModalManager} from "ui-layout-manager-dev";

import {useDalEngine} from "../../Providers/GlobalProviders";
import {AddBehavior} from "../Modals/AddBehavior";

import "./ToolBar.scss";

/**
 * Toolbar Component
 * @return {JSX.Element}
 */
export function ToolBar () {
    const {openModal} = useModalManager();
    const {engine} = useDalEngine();

    const publish = useLayoutEventPublisher();

    const saveGraph = useCallback(() => {
        if (engine) {
            engine.save();
            publish({
                type: "status:set",
                payload: "Saving design...",
                source: "tool-bar",
            });
        }
    }, [engine]);

    const addBehavior = () => {
        openModal({
            title: "Add Behavior",
            render: ({close}) => {
                return <AddBehavior close={close} />;
            },
        });
    };

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
                <Floppy
                    onClick={(e) => saveGraph()}
                    title="Save Graph"
                    className="icon"
                />
            </div>
        </div>
    );
}
