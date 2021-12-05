import React from "react";
import Scrollbars from "react-scrollbars-custom";
import cn from "classnames";
import { Ingredient } from "components";
import { IIngredient } from "types/ingredient";
import classes from "./menu.module.css";

export interface IMenuProps {
    menu?: IIngredient[];
    title?: string;
}

export const Menu: React.FC<IMenuProps> = ({ menu, title }) => {
    return (
        <Scrollbars
            disableTrackYWidthCompensation={true}
            style={{ maxHeight: 660, width: 600 }}
            thumbYProps={{ className: "thumbY" }}
        >
            <h2 className="text text_type_main-medium mb-6">{title}</h2>

            <ul className={cn("mb-10", classes.List)}>
                {menu &&
                    menu.map(ingredient => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                        />
                    ))}
            </ul>
        </Scrollbars>
    );
};
