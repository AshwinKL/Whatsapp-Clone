import { Avatar, IconButton } from "@mui/material";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState, useContext } from "react";
import db from "../firebase";
import { whatsappContext } from "../store/whatsapp-chat-context";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  //STATES
  const navigate = useNavigate();
  const [showAddChat, setShowAddChat] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [addChatInput, setAddChatInput] = useState("");
  const whatsappCtx = useContext(whatsappContext);

  //FUNCTIONS:
  const toggleChatHandler = () => {
    setShowAddChat((prev) => !prev);
  };

  const createChatHandler = (e) => {
    e.preventDefault();
    whatsappCtx.addRoom(addChatInput, props.user.displayName);
    props.setNotiMessage(`New chat room - ${addChatInput} is created 😄`);
    whatsappCtx.setUniversalStats(
      `New chat room - ${addChatInput} is created 😄`,
      props.user?.displayName
    );
    props.setVisible(true);
    setAddChatInput("");
    setShowAddChat(false);
  };

  useEffect(() => {
    navigate("/rooms");
  }, [rooms.length]);

  useEffect(() => {
    const subscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => subscribe();
  }, []);

  return (
    <div className={props.toggleSideBar ? "sidebar" : "sidebar hidden"}>
      <div className="sidebar__header">
        <Avatar src={props.user?.photoURL}></Avatar>
        <div className="sidebar__headerRight">
          {!showAddChat && (
            <>
              <p>Add Chat --{">"} </p>
              <IconButton onClick={toggleChatHandler}>
                <AddIcon />
              </IconButton>
            </>
          )}
          {showAddChat && (
            <IconButton onClick={toggleChatHandler}>
              <CloseIcon />
            </IconButton>
          )}
        </div>
      </div>
      {showAddChat && (
        <div className="sidebar__addChat">
          <form onSubmit={createChatHandler}>
            <input
              type="text"
              placeholder="Enter the chat name"
              value={addChatInput}
              onChange={(e) => setAddChatInput(e.target.value)}
            />
            <button type="submit">Add Chat</button>
          </form>
        </div>
      )}
      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat
            user={props.user}
            key={room.id}
            id={room.id}
            name={room.data.name}
            setNotiMessage={props.setNotiMessage}
            setVisible={props.setVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
