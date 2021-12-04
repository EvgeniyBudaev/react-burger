import React from "react";
import { IProduct } from "types/product";

export interface IMenuProps {
    menu?: IProduct[];
    title?: string;
}

export const Menu: React.FC<IMenuProps> = ({ menu, title }) => {
    console.log("menu products", menu);

    return (
        <>
            <h2 className="text text_type_main-medium mb-6 mt-10">{title}</h2>
        </>
    );
};
