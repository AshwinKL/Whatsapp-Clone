import { useState } from "react";
import "./ChatFooter.css";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import db from "../firebase";
import firebase from "firebase/compat/app";

const ChatFooter = ({ roomId, user }) => {
  const [enteredMessage, setEnteredMessage] = useState("");
  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (enteredMessage.trim() === "") return;
    console.log(enteredMessage);
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        name: user.displayName,
        message: enteredMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        id: Math.random() * 10000,
      });
    setEnteredMessage("");
  };
  return (
    <div className="chat__footer">
      <form onSubmit={sendMessageHandler}>
        <input
          type="text"
          placeholder="Type a message"
          value={enteredMessage}
          onChange={(e) => {
            setEnteredMessage(e.target.value);
          }}
        ></input>
        <IconButton type="submit" onClick={sendMessageHandler}>
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default ChatFooter;
