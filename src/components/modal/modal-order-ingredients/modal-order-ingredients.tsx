import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { OrderCardIngredientsDetails } from "components";
import { Modal } from "ui-kit";

export const ModalOrderIngredients: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const isModalOpen = location.state && location.state.modal;

    const handleCloseModal = () => {
        history.goBack();
    };

    return (
        <Modal title="" isOpen={isModalOpen} onClose={handleCloseModal}>
            <OrderCardIngredientsDetails />
        </Modal>
    );
};
