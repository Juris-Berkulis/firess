import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

export const ChartFormUI = (props) => {
    return (
        <Box className={props.classes.form} component='form' onSubmit={props.onSubmit}>
            <textarea className={`${props.classes.input} ${props.isMobileDeviceBoolean ? props.classes.input_mobileDevice : null}`} style={{height: (props.inputHeight)}} ref={props.refInput} placeholder="Сообщение" label="Сообщение" type="text" onChange={props.onSaveValueFromInput} value={props.value} />
            {
                props.imgSrcForSendMessage
                &&
                <img className={props.classes.imgInInput} onClick={props.resetAttachPicture} src={props.imgSrcForSendMessage} alt='img'></img>
            }
            <div className={props.classes.imgBtnWrapper}>
                <p className={props.classes.imgBtnText}>&#128206;</p>
                <input className={props.classes.imgBtn} onChange={props.attachPictures} onClick={props.resetAttachPicture} type="file" ref={props.refImgBtn}></input>
            </div>
            <IconButton type='submit' style={{height: `${props.inputMinHeight}px`, padding: `${(props.inputMinHeight - 24) / 2}px 1vw`, fontSize: '24px'}}>
            <Send />
            </IconButton>
        </Box>
    )
};
