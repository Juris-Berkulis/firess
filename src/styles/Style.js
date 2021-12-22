import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
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
  SigLogField: {
    height: '60vh',
    width: '100%',
    backgroundColor: '#000099',
    border: '3px solid #cccccc',
    borderRadius: '20px',
    padding: '5vh 5vw',
    color: '#eeeeee',
    fontSize: '16px',
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
  SigLogActionBtn: {
    fontSize: '1em',
    marginBottom: '3vh',
    padding: '0.3em 0.6em',
    borderRadius: '0.8em',
    border: 'none',
    backgroundColor: '#008000',
    color: '#eeeeee',
    cursor: 'pointer',
  },
  SigLogInfoDescription: {
    fontSize: '0.9em',
  },
  SigLogInfoLink: {
    color: '#88ff88',
  },
  headerNav: {
    height: '10vh',
    backgroundColor: '#000099',
  },
  headerNavItem: {
    color: '#cccccc'
  },
  textAttention: {
    color: '#ff0000',
    textAlign: 'center',
    backgroundColor: '#eeeeee',
    margin: '0 1.8vw',
    borderBottomLeftRadius: '2.5vw',
    borderBottomRightRadius: '2.5vw',
  },
  changeContactNameForm: {
    width: '100%',
    padding: '0 5px',
  },
  changeContactNameInput: {
    width: '100%',
    backgroundColor: '#eeeeee',
    padding: '0 2.5vw',
    borderRadius: '5vw',
  },
  changeContactNameButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: '1px solid #ffffff',
  },
  changeContactNameIcon: {
    color: '#eeeeee',
  },
  allChatsListItem: {
    marginBottom: '0.1vh',
    color: '#dddddd',
    fontSize: '20px',
  },
  chat: {
    width: '60vw',
    height: '100%',
    margin: '0',
    backgroundColor: '#88bbdd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '5vh 5vw',
    borderRadius: '5vw',
  },
  form: {
    height: '5vh',
    width: '100%',
    minHeight: '25px',
    display: 'flex',
    borderBottom: '1px solid #333333',
    marginTop: '1vh',
  },
  input: {
    width: '20px',
    flexGrow: 1,
    borderRight: 'none',
    outline: 'none',
  },
  chatsList: {
    height: '55vh',
    overflow: 'auto',
  },
  chatList: {
    width: '100%',
    overflow: 'auto',
  },
  chatListItem: {
    color: '#555555',
    fontSize: '24px',
    display: 'block !important',
    width: 'calc(100% - 40px - 15px) !important',
    borderRadius: '15px',
  },
  chatListItemMe: {
    textAlign: 'right',
    margin: '0 15px 1vh 40px',
    backgroundColor: '#99ff9999',
  },
  chatListItemSomebody: {
    textAlign: 'left',
    margin: '0 40px 1vh 15px',
    backgroundColor: '#ff999999',
  },
  chatListItemMessageAuthor: {
    fontSize: '16px',
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
  users_list__additionally: {
    fontSize: '20px',
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
});
