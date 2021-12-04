import React, { DOMAttributes } from "react";
import cn from "classnames";
import { IconType, iconTypes } from "./icon-type";
import styles from "./icon.module.css";

export interface IIconProps extends DOMAttributes<HTMLSpanElement> {
    className?: string;
    type: IconType;
}

const getIcon = (type: IconType): JSX.Element =>
    iconTypes.get(type) as JSX.Element;

export const Icon: React.FC<IIconProps> = ({ className, type, ...rest }) => {
    return (
        <div className={cn(styles.Icon, className)} {...rest}>
            {getIcon(type)}
        </div>
    );
};
