import React from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import { PersonAdd, DeleteForever, AccessTime, Star, StarBorder } from '@material-ui/icons';

export const ChangeChatsListUI = (props) => {
    return (
        <Box className={props.classes.changeContactNameForm} component='form' onSubmit={props.onSubmit}>
            <InputBase className={props.classes.changeContactNameInput} placeholder="Название чата" label="Название чата" type="text" onChange={props.onSaveNameFromInput} value={props.valueName} />
            {props.errorForProps}
            {props.successForProps}
            <div className={`${props.classes.changeContactNameButtons} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.changeContactNameButtons_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.changeContactNameButtons_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.changeContactNameButtons_sunnyTheme : null) : null}`}>
                <IconButton type='submit'>
                <PersonAdd className={`${props.classes.changeContactNameIcon} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.changeContactNameIcon_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.changeContactNameIcon_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.changeContactNameIcon_sunnyTheme : null) : null}`} />
                </IconButton>
                <IconButton onClick={props.deliteContact}>
                <DeleteForever className={`${props.classes.changeContactNameIcon} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.changeContactNameIcon_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.changeContactNameIcon_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.changeContactNameIcon_sunnyTheme : null) : null}`} />
                </IconButton>
                <IconButton onClick={props.changeStatusOnAllChatsOrOnlySelectedChats}>
                    {
                        props.onlySelectedChatsSel 
                        ? 
                        <Star className={`${props.classes.changeContactNameIcon} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.changeContactNameIcon_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.changeContactNameIcon_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.changeContactNameIcon_sunnyTheme : null) : null}`} />
                        : 
                        <StarBorder className={`${props.classes.changeContactNameIcon} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.changeContactNameIcon_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.changeContactNameIcon_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.changeContactNameIcon_sunnyTheme : null) : null}`} />
                    }
                </IconButton>
                {
                    props.isMobileDeviceBoolean 
                    ? 
                    <IconButton onClick={props.openAquarium}>
                    <AccessTime className={`${props.classes.changeContactNameIcon} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.changeContactNameIcon_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.changeContactNameIcon_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.changeContactNameIcon_sunnyTheme : null) : null}`} />
                    </IconButton>
                    : 
                    null
                }
            </div>
        </Box>
    )
};
