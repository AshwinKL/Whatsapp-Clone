import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import IndividualChat from "../IndividualChat/IndividualChat";
import ChatFooter from "../ChatFooter/ChatFooter";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../firebase";

const Chat = (props) => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [createdBy, setCreatedBy] = useState("");

  const chatTogglerHandler = () => {
    props.setVisible(false);
    props.toggleSideBarHandler();
    props.setVisible(true);
  };

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setCreatedBy(snapshot.data()?.createdby);
          setRoomName(snapshot.data()?.name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  return (
    <div className="chat">
      <div className="chat__toggler">
        <IconButton onClick={chatTogglerHandler}>
          <ArrowRightIcon />
        </IconButton>
      </div>
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Created by {createdBy}</p>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <IndividualChat
            messages={message}
            key={message.id}
            user={props.user}
          />
        ))}
      </div>
      <ChatFooter roomId={roomId} user={props.user} />
    </div>
  );
};

export default Chat;
