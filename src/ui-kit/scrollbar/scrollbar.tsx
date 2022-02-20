import React, {
    DetailedHTMLProps,
    ForwardedRef,
    forwardRef,
    HTMLAttributes,
    ReactNode,
} from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import classes from "./scrollbar.module.css";

export interface IScrollbarProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    autoHeight?: boolean;
    autoHeightMin?: number;
    autoHeightMax: number;
    className?: string;
    children?: ReactNode;
    hideTracksWhenNotNeeded?: boolean;
}

export const Scrollbar = forwardRef(
    (
        {
            className,
            autoHeight,
            autoHeightMin,
            autoHeightMax,
            children,
            hideTracksWhenNotNeeded,
        }: IScrollbarProps,
        ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
        return (
            <div className={className} ref={ref}>
                <Scrollbars
                    className={classes.Scrollbar}
                    autoHeight={autoHeight}
                    autoHeightMin={autoHeightMin}
                    autoHeightMax={autoHeightMax}
                    hideTracksWhenNotNeeded={hideTracksWhenNotNeeded}
                    renderTrackVertical={props => (
                        <div {...props} className={classes.track} />
                    )}
                    renderThumbVertical={props => (
                        <div {...props} className={classes.thumb} />
                    )}
                >
                    {children}
                </Scrollbars>
            </div>
        );
    }
);

Scrollbar.displayName = "Scrollbar";
