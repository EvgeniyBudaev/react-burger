import React from "react";
import cn from "classnames";
import { Ingredient } from "components";
import { IIngredient } from "types/ingredient";
import { Scrollbar } from "ui-kit";
import classes from "./menu.module.css";

export interface IMenuProps {
    menu?: IIngredient[];
    title?: string;
}

export const Menu: React.FC<IMenuProps> = ({ menu, title }) => {
    return (
        <>
            <Scrollbar
                autoHeight
                autoHeightMin={600}
                autoHeightMax={600}
                hideTracksWhenNotNeeded
            >
                <h2 className="text text_type_main-medium mb-6">{title}</h2>
                <ul className={cn("mb-10 pl-4 pr-4", classes.List)}>
                    {menu &&
                        menu.map(ingredient => (
                            <Ingredient
                                key={ingredient._id}
                                ingredient={ingredient}
                            />
                        ))}
                </ul>
            </Scrollbar>
        </>
    );
};
