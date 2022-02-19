import React from "react";
import { useDrop } from "react-dnd";
import cn from "classnames";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "hooks";
import { addIngredient } from "services/burger-constructor";
import { burgerConstructorSelector } from "services/selectors";
import { IIngredient } from "types/ingredient";
import { Icon, Scrollbar } from "ui-kit";
import { SelectedIngredient } from "./selected-ingredient";
import { ConstructorElement } from "./constructor-element";
import classes from "./burger-constructor.module.css";

export const BurgerConstructor: React.FC = () => {
    const defaultImageUrl =
        "https://toppng.com/uploads/preview/burger-svg-icon-free-burger-icon-11553410767qjmzrectv3.png";
    const { bun, mains } = useSelector(burgerConstructorSelector);
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
            {!isEmpty(mains) ? (
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
            ) : (
                <div className={classes.Empty}>
                    <div className={classes.Inner}>
                        <Icon
                            className={cn("mb-4", classes.IconCart)}
                            type="Cart"
                        />
                        <p>Перетащите сюда ингредиенты</p>
                    </div>
                </div>
            )}
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
