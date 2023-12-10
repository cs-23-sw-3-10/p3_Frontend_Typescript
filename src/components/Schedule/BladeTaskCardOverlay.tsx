import "./BladeTaskCard.css";
import React from "react";
import { dateDivLength } from "./TimelineField";
import { BladeTaskCardProps } from "./BladeTaskCard";

function BladeTaskCardOverlay(props: BladeTaskCardProps) {
    let cardStyle: React.CSSProperties;
    //Dynamic styling based on props values
    cardStyle = {
        backgroundColor: props.shown ? props.projectColor : "grey",
        width: `${props.duration * dateDivLength}px`,
        border: props.inConflict ? "2px dashed red" : "",
    };

    return (
        <div className="bladeTaskCard" style={cardStyle} id={`Overlay-id-${props.id}`}>
            {/* {used to visualize the attach period} */}
            <div
                className="attachPeriod"
                style={{
                    maxWidth: `${props.attachPeriod * 25}px`,
                    minWidth: `${props.attachPeriod * 25}px`,
                }}
            ></div>
            <div className="BT-Name">{props.taskName}</div>
            {/* {used to visualize the detach period} */}
            <div
                className="detachPeriod"
                style={{
                    maxWidth: `${props.detachPeriod * 25}px`,
                    minWidth: `${props.detachPeriod * 25}px`,
                }}
            ></div>
        </div>
    );
}

export default BladeTaskCardOverlay;
