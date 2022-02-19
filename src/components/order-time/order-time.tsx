import React from "react";

export interface IOrderTimeProps {
    time: string | undefined;
}

export const OrderTime: React.FC<IOrderTimeProps> = ({ time }) => {
    return (
        <span className="text text_type_main-default text_color_inactive">
            {time}
        </span>
    );
};
