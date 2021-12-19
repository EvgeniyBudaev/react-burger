import React, {
    DetailedHTMLProps,
    forwardRef,
    HTMLAttributes,
    MutableRefObject,
    useRef,
} from "react";
import cn from "classnames";
import { Ingredient } from "components";
import { IIngredient } from "types/ingredient";
import { Scrollbar } from "ui-kit";
import { getMenuTitle } from "utils/menu";
import classes from "./menu.module.css";

interface IMenu {
    id: string;
    list: IIngredient[];
    type: string;
}

export interface IMenuProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    menu?: IMenu[];
}

export const Menu = forwardRef(
    ({ className, menu }: IMenuProps, ref): JSX.Element => {
        const menuRef = useRef<HTMLDivElement>(null);

        return (
            <Scrollbar
                autoHeight
                autoHeightMin={600}
                autoHeightMax={600}
                hideTracksWhenNotNeeded
            >
                {menu.map(item => (
                    <React.Fragment key={item.id}>
                        <>
                            <div
                                className="text text_type_main-medium mb-6"
                                ref={node => {
                                    menuRef.current = node;
                                    if (typeof ref === "function") {
                                        ref(node);
                                    } else if (ref) {
                                        (
                                            ref as MutableRefObject<HTMLDivElement>
                                        ).current[item.type] = node;
                                    }
                                }}
                            >
                                {getMenuTitle(item.type)}
                            </div>
                            <ul className={cn("mb-10 pl-4 pr-4", classes.List)}>
                                {item.list &&
                                    item.list.map(ingredient => (
                                        <Ingredient
                                            key={ingredient._id}
                                            ingredient={ingredient}
                                        />
                                    ))}
                            </ul>
                        </>
                    </React.Fragment>
                ))}
            </Scrollbar>
        );
    }
);

Menu.displayName = "Menu";
