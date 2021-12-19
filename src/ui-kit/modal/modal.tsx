import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { default as ReactModal } from "react-responsive-modal";
import cn from "classnames";
import { Icon } from "ui-kit";
import "react-responsive-modal/styles.css";
import classes from "./modal.module.css";

type IModalSize = "medium";

export interface IModalProps {
    className?: string;
    children?: React.ReactNode;
    size?: IModalSize;
    title?: string;
    isOpen: boolean;
    onCloseModal: () => void;
}

const modalRoot = document.getElementById("react-modals");

export const Modal = ({
    className,
    children,
    size = "medium",
    title,
    isOpen,
    onCloseModal,
}: IModalProps): JSX.Element => {
    const defaultClassNames = {
        modal: cn(classes.ModalDefault, className, {
            [classes.ModalDefault__medium]: size === "medium",
        }),
        closeButton: cn(classes.ModalDefaultCloseButton),
    };
    const [styles, setStyles] = useState({});

    useEffect(() => {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
        if (isOpen && scrollbarWidth) {
            const _styles = {
                modal: { marginRight: `${scrollbarWidth + 16}px` },
            };
            setStyles(_styles);
            document.body.classList.add("Modal__open");
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            setStyles({});
            document.body.style.removeProperty("padding-right");
            document.body.classList.remove("Modal__open");
        };
    }, [isOpen]);

    return ReactDOM.createPortal(
        <ReactModal
            classNames={defaultClassNames}
            center
            closeIcon={<Icon type="Close" />}
            styles={styles}
            open={isOpen}
            onClose={onCloseModal}
        >
            <p className="text text_type_main-large">{title}</p>
            <div className="Modal">{children}</div>
        </ReactModal>,
        modalRoot
    );
};
