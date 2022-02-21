import React from 'react';

export const AquariumUI = (props) => {
    return (
        props.isMobileDeviceBoolean && !props.isAquariumStatus 
        ?
        null 
        : 
        <div className={`${props.classes.aquarium} ${props.isAquariumStatus ? props.classes.aquariumIsOpen : props.classes.aquariumIsClose} ${props.isMobileDeviceBoolean ? props.classes.aquarium_mobileDevice : null}`} ref={props.refAquariumField} onClick={props.changeAquariumStatus}>
            {
                props.isAquariumStatus 
                ? 
                <div className={props.classes.aquariumField}>
                    {
                        props.isPreloader 
                        ? 
                        <div className={props.classes.universalPreloaderCenter}>
                            <img className={props.classes.universalPreloaderImg} src={props.preloader} alt='Загрузка...' width={`${props.preloaderDimensions}px`}></img>
                        </div>
                        : 
                        <img className={`${props.classes.aquariumFish} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.aquariumFish_greyTheme : null) : null}`} style={{ top: `${props.moveOy}%`, left: `${props.moveOx}%`, transition: `top ${props.fishDuration}s ${props.fishTimingFunction} ${props.fishDelay}s, left ${props.fishDuration}s ${props.fishTimingFunction} ${props.fishDelay}s, transform 0s linear ${props.fishDelay}s`, transform: `rotateY(${props.rotateImg}deg) rotateZ(12deg)` }} src={props.goldFish} alt='Рыбка' width={`${props.fishWidth}%`}></img>
                    }
                </div>
                : 
                null
            }
        </div>
    )
};
