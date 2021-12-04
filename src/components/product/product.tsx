import React from "react";
import { IProduct } from "types/product";

export const Product: React.FC<IProduct> = ({ name }) => {
    return (
        <div>
            <h2>{name}</h2>
        </div>
    );
};
