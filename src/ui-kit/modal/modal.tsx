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
    isOpen: boolean;
    onCloseModal: () => void;
}

const modalRoot = document.getElementById("react-modals");

export const Modal = ({
    className,
    children,
    size = "medium",
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
        <>
            <ReactModal
                classNames={defaultClassNames}
                center
                closeIcon={<Icon type="Close" />}
                styles={styles}
                open={isOpen}
                onClose={onCloseModal}
            >
                <div className="Modal">{children}</div>
            </ReactModal>
        </>,
        modalRoot
    );
};

interface IModalHeaderProps {
    className?: string;
    align?: "start" | "center" | "end";
    children?: React.ReactNode;
}

Modal.Header = ({
    className,
    align,
    children,
}: IModalHeaderProps): JSX.Element => {
    return (
        <div
            className={cn(classes.ModalHeader, className, {
                ModalHeader__start: align === "start",
                ModalHeader__center: align === "center",
                ModalHeader__end: align === "end",
            })}
        >
            {children}
        </div>
    );
};

interface IModalContentProps {
    className?: string;
    children?: React.ReactNode;
}

Modal.Content = ({ className, children }: IModalContentProps): JSX.Element => {
    return (
        <div className={cn(classes.ModalContent, className)}>{children}</div>
    );
};
