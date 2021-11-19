import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  headerNav: {
    backgroundColor: '#000099',
    marginBottom: '10vh'
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
    fontSize: '36px',
  },
  chat: {
    width: '60vw',
    minHeight: '77vh',
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
    borderBottom: '1px solid #333333'
  },
  input: {
    width: '20px',
    flexGrow: 1,
    borderRight: 'none',
    outline: 'none',
  },
  chatList: {
    width: '100%',
  },
  chatListItem: {
    marginTop: '1vh',
    color: '#555555',
    fontSize: '24px',
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
    marginBottom: '10vh',
    cursor: 'pointer',
  },
  users_list__wrapper: {
    backgroundColor: '#aaaaaa',
    borderRadius: '15px',
  },
  users_list__items: {
    listStyle: 'none',
    padding: '1vw',
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
