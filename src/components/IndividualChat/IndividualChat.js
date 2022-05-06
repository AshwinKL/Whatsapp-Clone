import "./IndividualChat.css";
const IndividualChat = ({ messages, user }) => {
  return (
    <>
      <p
        className={`chat__message ${
          messages.name === user.displayName && "chat__receiver"
        }`}
      >
        <span className="chat__name">{messages.name}</span>
        {messages.message}
        <span className="chat__timestamp">
          {new Date(messages.timestamp?.toDate()).toLocaleTimeString()}
        </span>
      </p>
    </>
  );
};

export default IndividualChat;
