import React from 'react';

export const AquariumUI = (props) => {
    return (
        <div className={`${props.isMobileDeviceBoolean ? null : props.classes.aquarium}`} ref={props.refAquariumField}>
            <div className={props.classes.aquariumField}>
                <img className={props.classes.aquariumFish} style={{ top: `${props.moveOy}%`, left: `${props.moveOx}%`, transition: `top ${props.fishDuration}s ${props.fishTimingFunction} ${props.fishDelay}s, left ${props.fishDuration}s ${props.fishTimingFunction} ${props.fishDelay}s, transform 0s linear ${props.fishDelay}s`, transform: `rotateY(${props.rotateImg}deg) rotateZ(12deg)` }} src={props.goldFish} alt='Рыбка' width={`${props.fishWidth}%`}></img>
            </div>
        </div>
    )
};