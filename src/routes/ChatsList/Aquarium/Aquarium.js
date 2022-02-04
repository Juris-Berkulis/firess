import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBigChatIsOpenSelector } from '../../../store/BigChatStatus/Selectors';
import { useStyles } from '../../../styles/Style';
import { AquariumUI } from '../../../ui_components/AquariumUI';
import goldFish from '../../../img/fish/goldFish.gif';
import { getElementHeight, getElementWidth } from '../../../helper/helper';
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

    const changeAquariumStatus = () => {
        console.log('222')
        dispatch({
            type: aquariumStatus.type,
            payload: !isAquariumStatus,
        });
        console.log(isAquariumStatus)
        console.log(!isAquariumStatus)
    };

    useEffect(() => {
        const AquariumFieldWidth = getElementWidth(refAquariumField);
        const AquariumFieldHeight = getElementHeight(refAquariumField);
        const ratioOfWidthToHeight = AquariumFieldWidth / AquariumFieldHeight;

        const fishHeight = fishWidthRef.current / 1.38;

        let intervalId;
        const timerId = setTimeout(() => {
            let moveOxLast = moveOxBeginRef.current;

            const fishMoving = () => {
                let moveOxNext = Math.floor(Math.random() * (100 - fishWidthRef.current));
                setMoveOx(moveOxNext);
                setMoveOy(Math.floor(Math.random() * (100 - fishHeight * ratioOfWidthToHeight)));
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
        }
    }, []);

    return (
        isBigChatOpen ? null : <AquariumUI classes={classes} goldFish={goldFish} moveOx={moveOx} moveOy={moveOy} rotateImg={rotateImg} fishDuration={fishDuration} fishTimingFunction={fishTimingFunction} fishDelay={fishDelay} fishWidth={fishWidthRef.current} refAquariumField={refAquariumField} isAquariumStatus={isAquariumStatus} changeAquariumStatus={changeAquariumStatus}></AquariumUI>
    )
};
