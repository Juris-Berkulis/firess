import './Message.css';

export const Message = (props) => {
  return (
    <div className='wrapper'>
      <div className='just_container'>
        <p className='just_text'>{props.text}</p>
      </div>
    </div>
  );
}
