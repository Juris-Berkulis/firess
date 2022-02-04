import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBigChatIsOpenSelector } from '../../../store/BigChatStatus/Selectors';
import { useStyles } from '../../../styles/Style';
import { AquariumUI } from '../../../ui_components/AquariumUI';
import goldFish from '../../../img/fish/goldFish.gif';
import { getElementHeight, getElementWidth, isMobileDevice } from '../../../helper/helper';
import { getStatusesInTheAppIsAquariumOpenSelector } from '../../../store/AppSwitches/Selectors';
import { aquariumStatus } from '../../../store/AppSwitches/Action';

export const Aquarium = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const refAquariumField = useRef(null);

    const transitionTimingFunctionRef = useRef(['ease', 'ease-out', 'ease-in-out']);
    const fishWidthRef = useRef(15 + Math.floor(Math.random() * 11));
    const moveOxBeginRef = useRef(Math.floor(Math.random() * (100 - fishWidthRef.current)));

    const [moveOx, setMoveOx] = useState(moveOxBeginRef.current);
    const [moveOy, setMoveOy] = useState(0);
    const [rotateImg, setRotateImg] = useState(0);
    const [fishDuration, setFishDuration] = useState(3 + Math.floor(Math.random() * 10));
    const [fishTimingFunction, setFishTimingFunction] = useState(transitionTimingFunctionRef.current[Math.floor(Math.random() * transitionTimingFunctionRef.current.length)]);
    const [fishDelay, setFishDelay] = useState(1 + Math.floor(Math.random() * 2));

    const isBigChatOpen = useSelector(getBigChatIsOpenSelector);
    const isAquariumStatus = useSelector(getStatusesInTheAppIsAquariumOpenSelector);
    const isMobileDeviceBoolean = isMobileDevice();

    const changeAquariumStatus = () => {
        dispatch({
            type: aquariumStatus.type,
            payload: !isAquariumStatus,
        });
    };

    useEffect(() => {
        let AquariumFieldWidth;
        let AquariumFieldHeight;
        let ratioOfWidthToHeight;

        const getAquariumDimensions = () => {
            AquariumFieldWidth = getElementWidth(refAquariumField);
            AquariumFieldHeight = getElementHeight(refAquariumField);
            ratioOfWidthToHeight = AquariumFieldWidth / AquariumFieldHeight;
        };

        getAquariumDimensions();

        //* Метод addEventListener() присоединяет обработчик события к определенному DOM-элементу:
        if (window.addEventListener) { //* - для всех основных браузеров.
            window.addEventListener('resize', getAquariumDimensions);
        } else if (window.attachEvent) { //* - для IE 8 и более ранних версий, а также Opera 6.0 и более ранних версий.
            window.attachEvent('resize', getAquariumDimensions);
        }

        const fishHeight = fishWidthRef.current / 1.38;

        let intervalId;
        const timerId = setTimeout(() => {
            let moveOxLast = moveOxBeginRef.current;

            const fishMoving = () => {
                let moveOxNext = Math.floor(Math.random() * (100 - fishWidthRef.current));
                setMoveOx(moveOxNext);
                setMoveOy(Math.floor(Math.random() * (100 - fishHeight * ratioOfWidthToHeight - 1)));
                if (moveOxNext > moveOxLast) {
                    setRotateImg(0)
                } else if (moveOxNext < moveOxLast) {
                    setRotateImg(180)
                }
                setFishDuration(3 + Math.floor(Math.random() * 10));
                setFishTimingFunction(transitionTimingFunctionRef.current[Math.floor(Math.random() * transitionTimingFunctionRef.current.length)]);
                setFishDelay(1 + Math.floor(Math.random() * 2));

                moveOxLast = moveOxNext;
            };
    
            fishMoving();
    
            intervalId = setInterval(() => {
                fishMoving();
            }, 10000);
        }, 3000);

        return () => {
            clearInterval(intervalId)
            clearTimeout(timerId)
            if (window.removeEventListener) {
                window.removeEventListener('resize', getAquariumDimensions)
            }
            if (window.detachEvent) {
                window.detachEvent('resize', getAquariumDimensions)
            }
        }
    }, []);

    return (
        isBigChatOpen ? null : <AquariumUI classes={classes} goldFish={goldFish} moveOx={moveOx} moveOy={moveOy} rotateImg={rotateImg} fishDuration={fishDuration} fishTimingFunction={fishTimingFunction} fishDelay={fishDelay} fishWidth={fishWidthRef.current} refAquariumField={refAquariumField} isAquariumStatus={isAquariumStatus} changeAquariumStatus={changeAquariumStatus} isMobileDeviceBoolean={isMobileDeviceBoolean}></AquariumUI>
    )
};
