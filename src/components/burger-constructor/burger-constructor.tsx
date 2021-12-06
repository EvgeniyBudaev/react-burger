import React from "react";
import { ConstructorElement } from "components";
import { Scrollbar } from "ui-kit";
import { list } from "utils/data";

export const BurgerConstructor: React.FC = () => {
    return (
        <ul className="mb-10">
            <ConstructorElement
                isLocked={true}
                price={200}
                text="Краторная булка N-200i (верх)"
                thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                type="top"
                typeIngredient="bun"
            />
            <Scrollbar
                autoHeight
                autoHeightMin={469}
                autoHeightMax={469}
                hideTracksWhenNotNeeded
            >
                {list &&
                    list.map(product => (
                        <ConstructorElement
                            key={product._id}
                            price={product.price}
                            text={product.name}
                            thumbnail={product.image}
                            typeIngredient={product.type}
                        />
                    ))}
            </Scrollbar>
            <ConstructorElement
                isLocked={true}
                price={200}
                text="Краторная булка N-200i (низ)"
                thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                type="bottom"
                typeIngredient="bun"
            />
        </ul>
    );
};
