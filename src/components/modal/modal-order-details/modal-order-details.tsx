import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { OrderDetails } from "components";
import { Modal } from "ui-kit";

export const ModalOrderDetails: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const isModalOpen = location.state && location.state.modal;

    const handleCloseModal = () => {
        history.goBack();
    };

    return (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <OrderDetails />
        </Modal>
    );
};
