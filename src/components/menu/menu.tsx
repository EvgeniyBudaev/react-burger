import React from "react";
import Scrollbars from "react-scrollbars-custom";
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
            style={{ height: 716, width: 611 }}
            thumbYProps={{ className: "thumbY" }}
        >
            <div className={classes.Menu}>
                <h2 className="text text_type_main-medium mb-6 mt-10">
                    {title}
                </h2>
                <div className={classes.List}>
                    {menu &&
                        menu.map(ingredient => (
                            <Ingredient
                                key={ingredient._id}
                                ingredient={ingredient}
                            />
                        ))}
                </div>
            </div>
        </Scrollbars>
    );
};
