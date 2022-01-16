import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IngredientDetails } from "components";
import { Modal } from "ui-kit";

export const ModalIngredientDetails: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const isModalOpen = location.state && location.state.modal;

    const handleCloseModal = () => {
        history.goBack();
    };

    return (
        <Modal
            title="Детали ингредиента"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
        >
            <IngredientDetails />
        </Modal>
    );
};
