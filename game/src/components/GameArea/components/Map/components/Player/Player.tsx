import React, {Ref} from "react";
import "./Player.css";

function Player(props : {}, ref: Ref<any>): JSX.Element {

    return (
        <div className="character" ref={ref}>
            <div className="shadow pixel-art"></div>
            <div className="character_spritesheet pixel-art"></div>
        </div>
    )
}

export default React.forwardRef(Player);


