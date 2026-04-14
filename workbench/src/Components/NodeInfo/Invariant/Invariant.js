import React, {useCallback, useEffect, useState} from "react";

import PropTypes from "prop-types";
import {PlusSquare, Trash} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {useModalManager} from "ui-layout-manager-dev";

import {setSelectedInvariant} from "../../../Store/appSlice";
import {deleteInvariantThunk} from "../../../Store/appThunk";
import {useSelectedInvariant} from "../../../Store/useAppSelection";
import {AddPrediction} from "../../Modals/AddPrediction";

import "./Invariant.scss";

Invariant.propTypes = {
    invariant: PropTypes.object.isRequired,
};

/**
 * Invariant Info component.
 * @return {JSX.Element}
 */
export function Invariant ({invariant}) {
    const dispatch = useDispatch();
    const {openModal} = useModalManager();

    const [selected, setSelected] = React.useState(false);
    const selectedInvariant = useSelectedInvariant();

    const deleteInvariant = useCallback((e) => {
        e.stopPropagation();
        if (invariant) {
            dispatch(deleteInvariantThunk(invariant.getName()));
        }
    }, [invariant, dispatch]);

    const selectInvariant = useCallback((e) => {
        e.stopPropagation();
        if (invariant) {
            dispatch(setSelectedInvariant(invariant.getName()));
        }
    }, [invariant, dispatch]);

    useEffect(() => {
        if (!selectedInvariant || !invariant) {
            setSelected(false);
            return;
        }
        setSelected(selectedInvariant.getName() === invariant.getName());
    }, [selectedInvariant, invariant]);

    const addPrediction = useCallback(() => {
        openModal({
            title: "Add Prediction",
            render: ({close}) => {
                return <AddPrediction close={close} />;
            },
        });
    }, [openModal]);

    return (
        <div className={`participantCard ${selected ? "selected" : ""}`}
            onClick={selectInvariant}>
            <div className="label">
                <PlusSquare size={13}
                    title={"Add Prediction"}
                    className="icon"
                    onClick={addPrediction}/>
                {invariant.getName()}
            </div>
            <div className="icons">
                <Trash title={"Delete Invariant"} onClick={deleteInvariant} className="icon"/>
            </div>
        </div>
    );
}
