import React from "react";
import { ReactComponent as Close } from "images/icons/Close.svg";
import { ReactComponent as Done } from "images/icons/Done.svg";
import { ReactComponent as Spinner } from "images/icons/Spinner.svg";

export type IconType = "Close" | "Done" | "Spinner";

export const iconTypes = new Map([
    ["Close", <Close />],
    ["Done", <Done />],
    ["Spinner", <Spinner />],
]);
