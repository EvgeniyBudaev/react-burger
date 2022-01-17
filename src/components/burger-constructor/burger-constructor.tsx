import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { useTypedSelector } from "hooks/useTypedSelector";
import { addIngredient } from "services/burger-constructor";
import { IIngredient } from "types/ingredient";
import { Scrollbar } from "ui-kit";
import { SelectedIngredient } from "./selected-ingredient";
import { ConstructorElement } from "./constructor-element";

export const BurgerConstructor: React.FC = () => {
    const defaultImageUrl =
        "https://toppng.com/uploads/preview/burger-svg-icon-free-burger-icon-11553410767qjmzrectv3.png";
    const { bun, mains } = useTypedSelector(state => state.burgerConstructor);
    const dispatch = useDispatch();

    const [, dropRef] = useDrop({
        accept: "ingredient",
        drop(item: IIngredient) {
            dispatch(addIngredient(item));
        },
    });

    return (
        <ul className="mb-10" ref={dropRef}>
            <ConstructorElement
                _id={!isEmpty(bun) ? bun._id : ""}
                isLocked={true}
                price={!isEmpty(bun) ? bun.price : 0}
                text={!isEmpty(bun) ? `${bun.name} (верх)` : ""}
                thumbnail={!isEmpty(bun) ? bun.image_mobile : defaultImageUrl}
                type="top"
            />
            <Scrollbar
                autoHeight
                autoHeightMin={469}
                autoHeightMax={469}
                hideTracksWhenNotNeeded
            >
                {mains &&
                    mains.map((main, index) => (
                        <SelectedIngredient
                            key={main.id}
                            _id={main._id}
                            id={main.id}
                            index={index}
                            price={main.price}
                            text={main.name}
                            thumbnail={main.image_mobile}
                        />
                    ))}
            </Scrollbar>
            <ConstructorElement
                _id={!isEmpty(bun) ? bun._id : ""}
                isLocked={true}
                price={!isEmpty(bun) ? bun.price : 0}
                text={!isEmpty(bun) ? `${bun.name} (низ)` : ""}
                thumbnail={!isEmpty(bun) ? bun.image_mobile : defaultImageUrl}
                type="bottom"
            />
        </ul>
    );
};
