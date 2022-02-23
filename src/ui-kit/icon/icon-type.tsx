import React from "react";
import { newGuid } from "utils/guid";
import { ReactComponent as Cart } from "images/icons/Cart.svg";
import { ReactComponent as Close } from "images/icons/Close.svg";
import { ReactComponent as Done } from "images/icons/Done.svg";
import { ReactComponent as Spinner } from "images/icons/Spinner.svg";

export type IconType = "Cart" | "Close" | "Done" | "Spinner";

export const iconTypes = new Map([
    ["Cart", <Cart key={newGuid()} />],
    ["Close", <Close key={newGuid()} />],
    ["Done", <Done key={newGuid()} />],
    ["Spinner", <Spinner key={newGuid()} />],
]);
