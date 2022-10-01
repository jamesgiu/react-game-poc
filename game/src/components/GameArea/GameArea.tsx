import React, {createContext, useEffect, useRef, useState} from "react";
import "./GameArea.css";
import Player from "./components/Map/components/Player/Player";
import Map from "./components/Map/Map";

interface GameState {
    playerMoving: boolean,
    playerPosition: Position,
    direction: Direction,
    heldDirections: Direction[],
}

const CHARACTER_SPEED = 1;

const PIXEL_SIZE =  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
);

export interface Position {
    x: number,
    y: number
}

export enum Direction {
    UP,
    LEFT,
    RIGHT,
    DOWN
}

export const CONTROLS_MAP: { [key: string]: Direction } = {
    "w": Direction.UP,
    "a": Direction.LEFT,
    "d": Direction.RIGHT,
    "s": Direction.DOWN
}

const defaultGameState : GameState = {
    playerMoving: false,
    playerPosition: {x: 80, y: 30},
    direction: Direction.DOWN,
    heldDirections: []
}


const cameraLeft = PIXEL_SIZE * 66;
const cameraTop = PIXEL_SIZE * 42;

const GameContext = createContext<GameState>(defaultGameState);

function GameArea(): JSX.Element {
    const [gameState, setGameState] = useState(defaultGameState);
    const playerElement = useRef<HTMLDivElement>();
    const mapElement = useRef<HTMLDivElement>();

    // If the keys being held change.
    useEffect(()=> {
        // If they are being held.
        if (gameState.heldDirections.length > 0) {
            const firstHeldDirection = gameState.heldDirections[0];
            const newPosition : Position = gameState.playerPosition;
            const newDirectionFacing : Direction = firstHeldDirection;

            if (firstHeldDirection === Direction.RIGHT) {newPosition.x += CHARACTER_SPEED;}
            if (firstHeldDirection === Direction.LEFT) {newPosition.x -= CHARACTER_SPEED;}
            if (firstHeldDirection === Direction.DOWN) {newPosition.y += CHARACTER_SPEED;}
            if (firstHeldDirection === Direction.UP) {newPosition.y -= CHARACTER_SPEED;}

            setGameState({...gameState, playerPosition: newPosition, direction: newDirectionFacing, playerMoving: true});

            // TODO move to props/etc
            playerElement.current!.style.transform = `translate3d( ${newPosition.x*PIXEL_SIZE}px, ${newPosition.y*PIXEL_SIZE}px, 0 )`;

            mapElement.current!.style.transform = `translate3d( ${-newPosition.x*PIXEL_SIZE+cameraLeft}px, ${-newPosition.y*PIXEL_SIZE+cameraTop}px, 0 )`;
            playerElement.current!.setAttribute("facing", firstHeldDirection.toString());
        }
        // If there is nothing being held anymore.
        else {
            setGameState({...gameState, playerMoving: false});
        }

    }, [gameState.heldDirections]);


    useEffect(()=> {
        // TODO move to props/etc
        playerElement.current!.setAttribute("walking", String(gameState.playerMoving));
    }, [gameState.playerMoving])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const direction : Direction = CONTROLS_MAP[event.key];
        const newHeldDirections = Array.from(gameState.heldDirections);

        if (direction !== undefined && newHeldDirections.indexOf(direction) === -1) {
            newHeldDirections.unshift(direction)
        }

        setGameState({...gameState, heldDirections: newHeldDirections});
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const direction : Direction = CONTROLS_MAP[event.key];
        const newHeldDirections = Array.from(gameState.heldDirections);
        const index = newHeldDirections.indexOf(direction);
        if (index > -1) {
            newHeldDirections.splice(index, 1)
        }

        setGameState({...gameState, heldDirections: newHeldDirections});
    }

    return (
        <GameContext.Provider value={gameState}>
            <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
                <div className={"camera"}>
                    <Map ref={mapElement}>
                        <Player ref={playerElement}/>
                    </Map>
                </div>
            </div>
        </GameContext.Provider>
    )
}

export default GameArea;


