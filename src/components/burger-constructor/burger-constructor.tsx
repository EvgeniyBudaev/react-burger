import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { ConstructorElement } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { addIngredient } from "services/burger-constructor";
import { IIngredient } from "types/ingredient";
import { Scrollbar } from "ui-kit";
import { newGuid } from "utils/guid";

export const BurgerConstructor: React.FC = () => {
    const defaultImageUrl =
        "https://toppng.com/uploads/preview/burger-svg-icon-free-burger-icon-11553410767qjmzrectv3.png";
    const { bun, mains } = useTypedSelector(state => state.burgerConstructor);
    const dispatch = useDispatch();

    const [, dropRef] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item: IIngredient) {
            const itemWithId = { ...item, id: newGuid() };
            dispatch(addIngredient(itemWithId));
        },
    });

    return (
        <ul className="mb-10" ref={dropRef}>
            <ConstructorElement
                calories={!isEmpty(bun) ? bun.calories : 0}
                carbohydrates={!isEmpty(bun) ? bun.carbohydrates : 0}
                fat={!isEmpty(bun) ? bun.fat : 0}
                image_large={!isEmpty(bun) ? bun.image_large : ""}
                _id={!isEmpty(bun) ? bun._id : ""}
                isLocked={true}
                name={!isEmpty(bun) ? bun.name : ""}
                price={!isEmpty(bun) ? bun.price : 0}
                proteins={!isEmpty(bun) ? bun.proteins : 0}
                text={!isEmpty(bun) ? `${bun.name} (верх)` : ""}
                thumbnail={!isEmpty(bun) ? bun.image_mobile : defaultImageUrl}
                type="top"
                typeIngredient={!isEmpty(bun) ? bun.type : "bun"}
            />
            <Scrollbar
                autoHeight
                autoHeightMin={469}
                autoHeightMax={469}
                hideTracksWhenNotNeeded
            >
                {mains &&
                    mains.map((main, index) => (
                        <ConstructorElement
                            key={main._id}
                            calories={main.calories}
                            carbohydrates={main.carbohydrates}
                            fat={main.fat}
                            _id={main._id}
                            index={index}
                            image_large={main.image_large}
                            name={main.name}
                            price={main.price}
                            proteins={main.proteins}
                            text={main.name}
                            thumbnail={main.image_mobile}
                            typeIngredient={main.type}
                        />
                    ))}
            </Scrollbar>
            <ConstructorElement
                calories={!isEmpty(bun) ? bun.calories : 0}
                carbohydrates={!isEmpty(bun) ? bun.carbohydrates : 0}
                fat={!isEmpty(bun) ? bun.fat : 0}
                image_large={!isEmpty(bun) ? bun.image_large : ""}
                _id={!isEmpty(bun) ? bun._id : ""}
                isLocked={true}
                name={!isEmpty(bun) ? bun.name : ""}
                price={!isEmpty(bun) ? bun.price : 0}
                proteins={!isEmpty(bun) ? bun.proteins : 0}
                text={!isEmpty(bun) ? `${bun.name} (низ)` : ""}
                thumbnail={!isEmpty(bun) ? bun.image_mobile : defaultImageUrl}
                type="bottom"
                typeIngredient={!isEmpty(bun) ? bun.type : "bun"}
            />
        </ul>
    );
};
