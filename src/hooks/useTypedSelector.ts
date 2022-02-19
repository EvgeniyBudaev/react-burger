import { useSelector as selector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "services/types";

export const useSelector: TypedUseSelectorHook<RootState> = selector;
