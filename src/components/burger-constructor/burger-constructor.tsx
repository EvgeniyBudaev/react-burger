import React from "react";
import Scrollbars from "react-scrollbars-custom";
import { ConstructorElement } from "components";

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
            <Scrollbars
                disableTrackYWidthCompensation={true}
                style={{ height: 469, width: 600 }}
                thumbYProps={{ className: "thumbY" }}
            >
                <ConstructorElement
                    price={3000}
                    text="Говяжий метеорит (отбивная)"
                    thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                    typeIngredient="main"
                />
                <ConstructorElement
                    price={424}
                    text="Биокотлета из марсианской Магнолии"
                    thumbnail="https://code.s3.yandex.net/react/code/meat-01.png"
                    typeIngredient="main"
                />
                <ConstructorElement
                    price={90}
                    text="Соус Spicy-X"
                    thumbnail="https://code.s3.yandex.net/react/code/sauce-02.png"
                    typeIngredient="sauce"
                />
                <ConstructorElement
                    price={1337}
                    text="Мясо бессмертных моллюсков Protostomia"
                    thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
                    typeIngredient="main"
                />
                <ConstructorElement
                    price={15}
                    text="Соус традиционный галактический"
                    thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
                    typeIngredient="sauce"
                />
                <ConstructorElement
                    price={80}
                    text="Соус фирменный Space Sauce"
                    thumbnail="https://code.s3.yandex.net/react/code/sauce-04.png"
                    typeIngredient="sauce"
                />
                <ConstructorElement
                    price={874}
                    text="Плоды Фалленианского дерева"
                    thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
                    typeIngredient="main"
                />
            </Scrollbars>
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
