import React, {Ref} from "react";
import "./Map.css";

interface MapProps {
    children: JSX.Element
}


function Map(props: MapProps, ref: Ref<any>): JSX.Element {
    return (
        <div className="map pixel-art" ref={ref}>
            {props.children}
        </div>
    )
}

export default React.forwardRef(Map);


