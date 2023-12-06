import "./BladeTaskCard.css";
import React from "react";
import { dateDivLength } from "./TimelineField";
import { BladeTaskCardProps } from "./BladeTaskCard";


function BladeTaskCardOverlay(props: BladeTaskCardProps) {


    let cardStyle: React.CSSProperties;
    //Dynamic styling based on props values
    if (props.startDate) {
        cardStyle = {
            backgroundColor: props.shown ? props.projectColor : "grey",
            gridColumn: `date-${props.startDate.getFullYear()}-${props.startDate.getMonth()}-${props.startDate.getDate()} / span ${
                props.duration
            }`,
            border: props.inConflict ? "2px dashed red" : "",
        };} else{
            cardStyle = {
                backgroundColor: props.shown ? props.projectColor : "grey",
                width: `${props.duration * dateDivLength}px`,
                border: props.inConflict ? "2px dashed red" : "",
                gridRow: `project-${props.projectName}`,
                gridColumn: "2",
                justifyContent: "left",
            };
        }

        return (
            <div
            className="bladeTaskCard"
            style={cardStyle}
            id={`${props.id} Overlay`}
        >
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


