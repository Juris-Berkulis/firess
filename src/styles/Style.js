import { makeStyles } from '@material-ui/core/styles';
import { styleConsts } from './StyleConsts';

export const useStyles = makeStyles({
  center: {
    padding: '0 calc((100% - 90vw) / 2)',
  },
  main: {
    height: '100vh',
    backgroundColor: styleConsts.backgroundColor.mainColor2,
    padding: '0 0 10vh',
  },
  main_darkTheme: {
    backgroundColor: styleConsts.backgroundColor.mainColor2DarkTheme,
    filter: 'brightness(0.6)',
  },
  main_greyTheme: {
    backgroundColor: styleConsts.backgroundColor.mainColor2GreyTheme,
    filter: 'grayscale(1)',
  },
  main_sunnyTheme: {
    backgroundColor: styleConsts.backgroundColor.mainColor2SunnyTheme,
    filter: 'saturate(3)',
  },
  preloader__field: {
    height: '90vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '999',
  },
  preloader__center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preloader__title: {
    marginBottom: '0.1vh',
    fontSize: '36px',
    color: '#eeeeee'
  },
  preloader__description: {
    marginBottom: '5vh',
    fontSize: '24px',
    color: '#eeeeee'
  },
  preloader__img: {
    width: '250px',
  },
  universalPreloaderCenter: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    userSelect: 'none',
  },
  universalPreloaderImg: {
    pointerEvents: 'none',
  },
  field: {
    height: '90vh !important',
    padding: '5vh 10vw !important',
    overflow: 'hidden !important',
  },
  field_mobileMenuOpen: {
    display: 'none !important',
  },
  field_mobileDevice: {
    padding: '2vh 2vw 5vh !important',
  },
  SigLogWrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: styleConsts.backgroundColor.mainColor1,
    border: '3px solid #cccccc',
    borderRadius: '20px',
    padding: '0 20px',
    color: '#eeeeee',
    fontSize: '16px',
  },
  SigLogField: {
    height: '100%',
    width: '100%',
    padding: '5vh 5vw',
    overflow: 'auto',
  },
  SigLogForm: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  SigLogDescription: {
    fontSize: '1em',
    marginBottom: '3vh',
    textAlign: 'center',
  },
  SigLogArea: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  SigLogInput: {
    width: '40%',
    marginBottom: '3vh',
    border: '1px solid #cccccc',
    borderRadius: '0.8em',
    padding: '0.3em 0.6em',
    fontSize: '1em',
  },
  SigLogInputMobileDevice: {
    width: '100%',
  },
  SigLogEmailInput: {
    marginBottom: '1.5vh',
  },
  SigLogActionErrorArea: {
    width: '80%',
    backgroundColor: '#ffcccc',
    padding: '1em',
    marginBottom: '3vh',
    borderRadius: '1.5em',
  },
  SigLogActionErrorText: {
    textAlign: 'center',
    color: '#ff0000',
    fontSize: '1em',
  },
  SigLogActionButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  SigLogActionBtn: {
    fontSize: '1em',
    margin: '0 10px 1vh',
    padding: '0.3em 0.6em',
    borderRadius: '0.8em',
    border: '1.5px solid #cccccc',
    backgroundColor: '#2b6d2b',
    color: '#eeeeee',
    cursor: 'pointer',
  },
  SigLogActionWaiting: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  SigLogTitle: {
    fontSize: '1.5em',
    marginBottom: '1vh',
    textAlign: 'center',
  },
  SigLogActionWaitingText: {
    fontSize: '1em',
    marginBottom: '3vh',
    textAlign: 'center',
  },
  SigLogActionWaitingText_countdown: {
    marginBottom: '1vh',
  },
  SigLogActionPreloader: {
    width: '25vw',
    marginBottom: '3vh',
  },
  SigLogInfoDescription: {
    fontSize: '0.9em',
  },
  SigLogInfoLink: {
    color: '#88ff88',
  },
  headerNav: {
    height: '10vh !important',
    minHeight : '10vh !important',
    backgroundColor: styleConsts.backgroundColor.mainColor1,
  },
  headerNavMobileOpen: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh !important',
    minHeight : '100vh !important',
    display: 'flex !important',
    flexDirection: 'column',
    paddingTop: '10vh !important',
    zIndex: '9',
    overflow: 'auto',
  },
  headerNavItem: {
    color: '#ffffee'
  },
  headerNavItemMobile: {
    display: 'none',
  },
  chatsListActionResaltInfo_attention: {
    color: '#ff0000',
  },
  chatsListActionResaltInfo_success: {
    color: '#33aa33',
  },
  changeContactNameForm: {
    width: '100%',
    padding: '0 5px',
  },
  changeContactNameInfo: {
    textAlign: 'center',
    backgroundColor: '#eeeeee',
    margin: '0 2.5vw',
    padding: '0 2.5vw',
    borderBottomLeftRadius: '2.5vw',
    borderBottomRightRadius: '2.5vw',
  },
  changeContactNameInput: {
    width: '100%',
    backgroundColor: '#eeeeee',
    padding: '10px 2.5vw',
    borderRadius: '2.5vw',
    border: 'none',
    '&:focus': {
      outline: 'none',
    }
  },
  changeChatsSearchMode: {
    width: '100%',
    marginBottom: '5px',
    padding: '5px',
    backgroundColor: '#dddddd',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#cccccc',
    }
  },
  changeChatsSearchMode_success: {
    color: '#33aa33',
  },
  changeChatsSearchMode_attention: {
    color: '#ff0000',
  },
  changeContactNameButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: `1px solid ${styleConsts.color.chatsListColor}`,
  },
  changeContactNameButtons_darkTheme: {
    borderBottom: `1px solid ${styleConsts.color.chatsListColorDarkTheme}`,
  },
  changeContactNameButtons_greyTheme: {
    borderBottom: `1px solid ${styleConsts.color.chatsListColorGreyTheme}`,
  },
  changeContactNameButtons_sunnyTheme: {
    borderBottom: `1px solid ${styleConsts.color.chatsListColorSunnyTheme}`,
  },
  changeContactNameIcon: {
    color: styleConsts.color.chatsListColor,
  },
  changeContactNameIcon_darkTheme: {
    color: styleConsts.color.chatsListColorDarkTheme,
  },
  changeContactNameIcon_greyTheme: {
    color: styleConsts.color.chatsListColorGreyTheme,
  },
  changeContactNameIcon_sunnyTheme: {
    color: styleConsts.color.chatsListColorSunnyTheme,
  },
  allChatsListItem: {
    marginBottom: '0.1vh',
    color: styleConsts.color.chatsListColor,
    fontSize: '20px',
    display: 'flex !important',
    justifyContent: 'space-between !important',
    alignItems: 'center !important',
    padding: '8px 5px 8px 16px !important',
  },
  allChatsListItem_darkTheme: {
    color: styleConsts.color.chatsListColorDarkTheme,
  },
  allChatsListItem_greyTheme: {
    color: styleConsts.color.chatsListColorGreyTheme,
  },
  allChatsListItem_sunnyTheme: {
    color: styleConsts.color.chatsListColorSunnyTheme,
  },
  allChatsListItem_chatNameWrapper: {
    overflow: 'auto',
    whiteSpace: 'pre', //* - It is preferable to use "nowrap" instead of "pre", but in this case it will be difficult to delete the chat from the database.
  },
  allChatsListItem_wrapperSymbols: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  allChatsListItem_privatChatIcon: {
    fontSize: '60%',
  },
  allChatsListItem_favoriteIcon: {
    fontSize: '100%',
    lineHeight: '80%',
    color: styleConsts.color.favoriteIconColor,
    marginLeft: '5px',
    fontWeight: '500',
  },
  allChatsListItem_favoriteIcon_darkTheme: {
    color: styleConsts.color.favoriteIconColorDarkTheme,
  },
  allChatsListItem_favoriteIcon_greyTheme: {
    color: styleConsts.color.favoriteIconColorGreyTheme,
  },
  allChatsListItem_favoriteIcon_sunnyTheme: {
    color: styleConsts.color.favoriteIconColorSunnyTheme,
  },
  chat: {
    width: '60vw',
    height: '100%',
    margin: '0',
    backgroundColor: styleConsts.backgroundColor.openChatColor,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5vh 5vw',
    borderRadius: '5vw',
  },
  chat_darkTheme: {
    backgroundColor: styleConsts.backgroundColor.openChatColorDarkTheme,
  },
  chat_greyTheme: {
    backgroundColor: styleConsts.backgroundColor.openChatColorGreyTheme,
    filter: 'grayscale(1) invert(1)',
  },
  chat_sunnyTheme: {
    backgroundColor: styleConsts.backgroundColor.openChatColorSunnyTheme,
  },
  chatMobileDevice: {
    width: '100%',
  },
  chatUpPart: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '2vh',
  },
  chatDownPart: {
    width: '100%',
    maxHeight: '90%',
    minHeight: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  form: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    borderBottom: '1px solid #333333',
    marginTop: '4px',
  },
  input: {
    flexGrow: 1,
    background: 'transparent',
    border: 'none',
    borderRadius: '12px',
    padding: '6px 1vw',
    fontSize: '20px',
    lineHeight: '100%',
    outline: 'none',
    resize: 'none',
  },
  input_mobileDevice: {
    fontSize: '14px',
    padding: '9px 1vw',
  },
  chatsList: {
    height: '55vh',
    overflow: 'auto',
    paddingRight: '2vw !important',
  },
  chatList: {
    width: '100%',
    overflow: 'auto',
  },
  chatListItem: {
    width: '100% !important',
    padding: '0 !important',
    display: 'flex !important',
  },
  chatListItemMe: {
    justifyContent: 'flex-end !important',
  },
  chatListItemSomebody: {
    justifyContent: 'flex-start !important',
  },
  chatListItemMessage: {
    color: '#555555',
    display: 'inline-block',
    borderRadius: '15px',
    wordBreak: 'break-word',
    minWidth: '50%',
    maxWidth: '85%',
    padding: '8px 16px',
  },
  chatListItemMessageMe: {
    textAlign: 'left !important',
    margin: '0 2% 1vh 0',
    backgroundColor: '#a4e8be',
  },
  chatListItemMessageSomebody: {
    textAlign: 'left !important',
    margin: '0 0 1vh 2%',
    backgroundColor: '#e1abbe',
  },
  chatListItemMessageSomebody_greyTheme: {
    backgroundColor: '#ddcccc',
  },
  chatListItemMessageAuthor: {
    color: '#777777',
    fontSize: '16px',
    marginBottom: '2px',
  },
  chatListItemMessageAuthorMobileDevice: {
    fontSize: '10px',
  },
  chatListItemMessageText: {
    marginBottom: '5px',
    fontSize: '20px',
  },
  chatListItemMessageTextMobileDevice: {
    marginBottom: '2px',
    fontSize: '14px',
  },
  chatListItemMessageDateAndTime: {
    color: '#777777',
    fontSize: '14px',
  },
  chatListItemMessageDateAndTimeMobileDevice: {
    fontSize: '10px',
  },
  chatControlPanel: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ddddddcc',
    borderRadius: '5px',
  },
  chatControlPanelLeftPart: {
    width: '60%',
    marginRight: '5%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  chatControlPanelLeftPart_mobileDevice: {
    paddingLeft: '5px',
  },
  chatControlPanelIconsWrapper: {
    marginRight: '5px',
  },
  chatControlPanelIPrivatChatIcon: {
    fontSize: '80%',
  },
  chatControlPanelName: {
    width: '100%',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    color: '#555555',
    fontSize: '18px',
    paddingLeft: '5px',
  },
  chatControlPanelName_mobileDevice: {
    fontSize: '12px',
  },
  chatControlPanelRightPart: {
    width: '35%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chatControlPanelMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chatControlPanelBtn: {
    padding: '10px',
    marginLeft: '10px',
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#aaadb3',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    lineHeight: '18px',
  },
  chatControlPanelBtn_mobileDevice: {
    padding: '5px',
    marginLeft: '5px',
    fontSize: '12px',
    lineHeight: '12px',
  },
  chatControlPanelBtn__changeChatPassword: {
    transform: 'rotateY(180deg)',
  },
  popUpWindow: {
    width: '50vw',
    minHeight: '20vh',
    maxHeight: '70vh',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: styleConsts.backgroundColor.mainColor1,
    zIndex: '2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '5vh 5vw',
    overflow: 'auto',
    border: 'solid 2px #555555',
    borderRadius: '15px',
  },
  popUpWindow_mobileDevice: {
    width: '90vw',
  },
  popUpWindowQuestion: {
    fontSize: '18px',
    lineHeight: '20px',
    marginBottom: '5vh',
    color: '#dddddd',
    overflow: 'auto',
    textAlign: 'center',
  },
  popUpWindowQuestion_mobileDevice: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  popUpWindowAction: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  popUpWindowBtn: {
    fontSize: '14px',
    lineHeight: '14px',
    padding: '10px 16px',
    margin: '0 2vw',
    cursor: 'pointer',
    backgroundColor: styleConsts.backgroundColor.popUpWindowBtnColor,
    color: '#dddddd',
    border: 'solid 1px #555555',
    borderRadius: '10px',
  },
  popUpWindowBtn_darkTheme: {
    backgroundColor: styleConsts.backgroundColor.popUpWindowBtnColorDarkTheme,
  },
  popUpWindowBtn_greyTheme: {
    backgroundColor: styleConsts.backgroundColor.popUpWindowBtnColorGreyTheme,
  },
  popUpWindowBtn_sunnyTheme: {
    backgroundColor: styleConsts.backgroundColor.popUpWindowBtnColorSunnyTheme,
  },
  popUpWindowBtn_mobileDevice: {
    fontSize: '10px',
    lineHeight: '10px',
  },
  popUpWindowForChangeChatPasswor_input: {
    width: '80%',
    marginBottom: '2.5vh',
    border: '1px solid #cccccc',
    borderRadius: '0.8em',
    padding: '0.3em 0.6em',
    fontSize: '1em',
  },
  popUpWindowForChangeChatPasswor_input_mobileDevice: {
    fontSize: '0.7em',
  },
  popUpWindowForChangeChatPasswor_errorWrapper: {
    width: '80%',
    backgroundColor: '#ffcccc',
    padding: '1em',
    marginBottom: '2.5vh',
    borderRadius: '1.5em',
  },
  popUpWindowForChangeChatPasswor_errorText: {
    textAlign: 'center',
    color: '#ff0000',
    fontSize: '1em',
  },
  aquarium: {
    width: '60vw',
    height: '100%',
    margin: '0',
    padding: '5vh 5vw',
    borderRadius: '5vw',
    cursor: 'pointer',
    userSelect: 'none',
  },
  aquarium_mobileDevice: {
    width: '100vw',
  },
  aquariumIsOpen: {
    backgroundColor: styleConsts.backgroundColor.openChatColor,
  },
  aquariumIsOpen_darkTheme: {
    backgroundColor: styleConsts.backgroundColor.openChatColorDarkTheme,
  },
  aquariumIsOpen_greyTheme: {
    backgroundColor: styleConsts.backgroundColor.openChatColorGreyTheme,
    filter: 'grayscale(1) invert(1)',
  },
  aquariumIsOpen_sunnyTheme: {
    backgroundColor: styleConsts.backgroundColor.openChatColorSunnyTheme,
  },
  aquariumIsClose: {
    backgroundColor: 'transparent',
  },
  aquariumField: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  aquariumFish: {
    position: 'absolute',
    pointerEvents: 'none',
  },
  aquariumFish_greyTheme: {
    filter: 'brightness(0.8) opacity(0.5)',
  },
  youAreDeniedAccessToTheChat_field: {
    overflow: 'auto',
    width: '100%',
  },
  youAreDeniedAccessToTheChat_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '14px',
  },
  youAreDeniedAccessToTheChat_wrapperInfo: {
    width: '90%',
  },
  youAreDeniedAccessToTheChat_textInfo: {
    marginBottom: '2.5vh',
    color: '#eeeeee',
    fontSize: '1.5em',
    lineHeight: '1.2em',
  },
  youAreDeniedAccessToTheChat_textInfo__first: {
    marginBottom: '0',
  },
  youAreDeniedAccessToTheChat_input: {
    width: '80%',
    marginBottom: '2.5vh',
    border: '1px solid #cccccc',
    borderRadius: '0.8em',
    padding: '0.3em 0.6em',
    fontSize: '1em',
  },
  youAreDeniedAccessToTheChat_wrapper_input_mobileDevice: {
    width: '100%',
  },
  youAreDeniedAccessToTheChat_errorWrapper: {
    width: '80%',
    backgroundColor: '#ffcccc',
    padding: '1em',
    marginBottom: '2.5vh',
    borderRadius: '1.5em',
  },
  youAreDeniedAccessToTheChat_errorText: {
    textAlign: 'center',
    color: '#ff0000',
    fontSize: '1em',
  },
  youAreDeniedAccessToTheChat_btn: {
    color: '#eeeeee',
  },
  api_users__title: {
    color: '#eeeeee',
    marginBottom: '5vh',
  },
  api_users__btn: {
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#ffff88',
    color: '#333333',
    marginBottom: '5vh',
    cursor: 'pointer',
  },
  users_list__wrapper: {
    backgroundColor: '#aaaaaa',
    borderRadius: '15px',
  },
  users_list__items: {
    listStyle: 'none',
    padding: '1vw',
    overflow: 'auto',
    height: '55vh',
  },
  users_list__items__screen_height_less_than_450: {
    height: '45vh',
  },
  users_list__item: {
    color: '#333333',
    margin: '0 2vh 1vw',
    padding: '15px',
    backgroundColor: '#aaaaff',
    borderRadius: '15px',
  },
  users_list__name: {
    marginBottom: '1vh',
    fontSize: '28px',
  },
  users_list__name__mobile_device: {
    fontSize: '16px',
  },
  users_list__additionally: {
    fontSize: '20px',
  },
  users_list__additionally__mobile_device: {
    fontSize: '12px',
  },
  users_loader__field: {
    height: '100%',
    width: '100%',
    paddingBottom: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  users_loader__center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  users_loader__text: {
    marginBottom: '10vh',
  },
  users_loader__img: {
    width: '250px',
  },
  users_loader__img__mobile_device: {
    height: '20vh',
    width: 'auto',
  },
  users_error__field: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  users_error__wrapper_text: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#ffbbdd'
  },
  users_error__text: {
    color: '#333333'
  },
  page__fieldWrapper: {
    height: '100%',
    width: '100%',
    paddingBottom: '0',
  },
  page__fieldWrapper_mobileDevice: {
    paddingBottom: '5vh',
  },
  page__field: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    color: styleConsts.color.chatsListColor,
    fontSize: '48px',
    lineHeight: '48px',
    padding: '0 2vw 0 1vw',
    textAlign: 'justify',
  },
  page__field_darkTheme: {
    color: styleConsts.color.chatsListColorDarkTheme,
  },
  page__field_greyTheme: {
    color: styleConsts.color.chatsListColorGreyTheme,
  },
  page__field_sunnyTheme: {
    color: styleConsts.color.chatsListColorSunnyTheme,
  },
  page__field_mobileDevice: {
    fontSize: '24px',
    lineHeight: '24px',
  },
  page__title: {
    fontSize: 'calc(1em / 48 * 48)',
    lineHeight: 'calc(1em * 1)',
    marginBottom: '2vh',
  },
  home__appNameWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  home__appName: {
    fontSize: 'calc(1em / 48 * 60)',
    lineHeight: 'calc(1em * 1)',
    marginBottom: '2vh',
    color: styleConsts.color.homeAppNameColor,
    textAlign: 'center',
  },
  home__appName_darkTheme: {
    color: styleConsts.color.homeAppNameColorDarkTheme,
  },
  home__appName_greyTheme: {
    color: styleConsts.color.homeAppNameColorGreyTheme,
  },
  home__appName_sunnyTheme: {
    color: styleConsts.color.homeAppNameColorSunnyTheme,
  },
  home__appDescriptionWrapper: {
    marginBottom: '2vh',
  },
  home__descriptionParagraphWrapper: {
    fontSize: 'calc(1em / 48 * 28)',
    lineHeight: 'calc(1em * 1.25)',
  },
  home__descriptionParagraph: {
    fontSize: 'calc(1em / 48 * 28)',
    lineHeight: 'calc(1em * 1.25)',
    marginBottom: '1vh',
  },
  home__descriptionTitle: {
    fontSize: 'calc(1em / 48 * 36)',
    lineHeight: 'calc(1em * 1)',
    margin: '2vh 0 1vh',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  home__benefitsWrapper: {
    marginBottom: '1vh',
  },
  home__benefitsParagraph: {
    fontSize: 'calc(1em / 48 * 28)',
    lineHeight: 'calc(1em * 1.25)',
  },
  home__benefitName: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  home__benefitsList: {
    fontSize: 'calc(1em / 48 * 28)',
    lineHeight: 'calc(1em * 1.25)',
    listStyle: 'inside',
    listStyleType: 'disclosure-closed',
    marginBottom: '2vh',
  },
  home__benefitsListItem: {
    margin: '0.3vh 0',
  },
  home__descriptionMiniTitle: {
    fontSize: 'calc(1em / 48 * 32)',
    lineHeight: 'calc(1em * 1)',
    margin: '2vh 0 1vh',
  },
  home__logoWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2vh',
  },
  home__logoImg: {
    height: '10vw',
    width: 'auto',
    margin: '2vh 2vw',
  },
  deviceOnTheNetwork__wrapper: {
    position: 'fixed',
    top: '2vh',
    right: '2vw',
    height: '6vh',
    width: '6vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    cursor: 'help',
    zIndex: '1',
  },
  deviceOnTheNetwork__lamp: {
    height: '1vh',
    width: '1vh',
    border: 'solid 0.2vh #111111',
    borderRadius: '50%',
    backgroundColor: '#cccccc',
  },
  deviceOnTheNetwork__lamp_connectNetwork_1: {
    animation: "$pulseConnectNetwork 5s linear infinite 0.1s"
  },
  deviceOnTheNetwork__lamp_connectNetwork_2: {
    animation: "$pulseConnectNetwork 5s linear infinite 0.35s"
  },
  deviceOnTheNetwork__lamp_connectNetwork_3: {
    animation: "$pulseConnectNetwork 5s linear infinite 0.6s"
  },
  "@keyframes pulseConnectNetwork": {
    "0%": {
      backgroundColor: '#cccccc',
    },
    "47%": {
      backgroundColor: '#cccccc',
    },
    "47.5%": {
      backgroundColor: '#00cc00',
    },
    "52.5%": {
      backgroundColor: '#00cc00',
    },
    "53%": {
      backgroundColor: '#cccccc',
    },
    "100%": {
      backgroundColor: '#cccccc',
    },
  },
  deviceOnTheNetwork__lamp_disconnectNetwork: {
    animation: "$pulseDisconnectNetwork 1s linear infinite 0.1s"
  },
  "@keyframes pulseDisconnectNetwork": {
    "0%": {
      backgroundColor: '#cccccc',
    },
    "24%": {
      backgroundColor: '#cccccc',
    },
    "25%": {
      backgroundColor: '#cc0000',
    },
    "74%": {
      backgroundColor: '#cc0000',
    },
    "75%": {
      backgroundColor: '#cccccc',
    },
    "100%": {
      backgroundColor: '#cccccc',
    },
  },
});
