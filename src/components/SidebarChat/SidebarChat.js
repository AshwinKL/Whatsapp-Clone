import "./SidebarChat.css";

import { useContext, useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { whatsappContext } from "../store/whatsapp-chat-context";
import { Link } from "react-router-dom";
import db from "../firebase";

const SidebarChat = ({ id, name, setNotiMessage, setVisible, user }) => {
  const whatsappCtx = useContext(whatsappContext);
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const renderMessage = messages[0]?.message
    ? messages[0].message
    : "Start conversation";
  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{renderMessage}</p>
        </div>

        <IconButton
          onClick={() => {
            setNotiMessage(`Oops the room - ${name} has been deleted 😢`);
            whatsappCtx.setUniversalStats(
              `Oops the room - ${name} has been deleted 😢`,
              user.displayName
            );
            setVisible(true);
            whatsappCtx.deleteRoom(id);
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </Link>
  );
};

export default SidebarChat;
