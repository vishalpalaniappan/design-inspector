import React, {useCallback, useEffect, useState} from "react";

import PropTypes from "prop-types";
import {PlusSquare, Trash} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {useModalManager} from "ui-layout-manager-dev";

import {setSelectedInvariant} from "../../../Store/appSlice";
import {deleteInvariantThunk} from "../../../Store/appThunk";
import {removePredictionThunk} from "../../../Store/appThunk";
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

    const addPrediction = useCallback((e) => {
        e.stopPropagation();
        dispatch(setSelectedInvariant(invariant.getName()));
        openModal({
            title: "Add Prediction",
            render: ({close}) => {
                return <AddPrediction close={close} />;
            },
        });
    }, [openModal, invariant, dispatch]);

    const removePrediction = useCallback((e, behavior) => {
        e.stopPropagation();
        dispatch(setSelectedInvariant(invariant.getName()));
        if (invariant) {
            dispatch(removePredictionThunk(behavior));
        }
    }, [invariant]);

    return (
        <div className={`participantCard ${selected ? "selected" : ""}`}
            onClick={selectInvariant}>

            <div className="label-row">
                <div className="icons">
                    <PlusSquare size={13}
                        title={"Add Prediction"}
                        className="icon"
                        onClick={addPrediction}/>
                </div>
                <div className="label">
                    {invariant.getName()}
                </div>
                <div className="icons">
                    <Trash
                        title={"Delete Invariant"}
                        onClick={deleteInvariant}
                        className="icon"/>
                </div>
            </div>

            {invariant.predictedFailures.length > 0 && (
                <div className="divider"></div>
            )}

            {invariant.predictedFailures.map((prediction, index) => (
                <div key={index} className="prediction">
                    <div className="prediction-name">{prediction.behavior}</div>
                    <div className="prediction-trash">
                        <Trash
                            onClick={(e) => removePrediction(e, prediction.behavior)}
                            title={"Delete Prediction"}
                            className="icon"/>
                    </div>
                </div>
            ))}
        </div>
    );
}
