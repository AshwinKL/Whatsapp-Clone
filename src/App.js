import "./App.css";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";

import { Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";
import WhatsappContextProvider from "./components/store/whatsapp-chat-context";
import NotificationModal from "./components/UI/NotificationModal";
import Login from "./components/Login/Login";
import db from "./components/firebase";

function App() {
  const [toggleSideBar, setToggleSideBar] = useState(true);

  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState(null);
  const [downMessage, setdownMessage] = useState({
    message: "App Developed",
    by: "Ashwin K L",
    timestamp: "05-05-2022",
  });

  useEffect(() => {
    db.collection("stats")
      .doc("lastStats")
      .onSnapshot((snapShot) => {
        setdownMessage({
          message: snapShot.data().message,
          by: snapShot.data().by,
          timestamp: snapShot.data().timestamp?.toDate().toLocaleString(),
        });
      });
  }, []);

  const setUserHandler = (user) => {
    setUser(user);
  };

  const [notiMessage, setNotiMessage] = useState(`Welcome home buddy!`);

  const toggleSideBarHandler = () => {
    if (!toggleSideBar) {
      setNotiMessage("Sidebar is Opened ! Now You can see the rooms 😉");
    } else {
      setNotiMessage(
        "Sidebar closed ! Now you have more room to view chats 😎"
      );
    }
    setToggleSideBar((prev) => !prev);
  };

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <div className="app">
              {!user ? (
                <Login setUserHandler={setUserHandler} />
              ) : (
                <>
                  <div className="app__bottomContainer">
                    <p>{`${downMessage.message}   by   ${downMessage.by}   on   ${downMessage.timestamp}`}</p>
                  </div>
                  <NotificationModal
                    notiMessage={notiMessage}
                    visible={visible}
                    setVisible={setVisible}
                  />
                  <div className="app__body">
                    <WhatsappContextProvider>
                      <Sidebar
                        user={user}
                        toggleSideBar={toggleSideBar}
                        setNotiMessage={setNotiMessage}
                        setVisible={setVisible}
                      ></Sidebar>
                      <Routes>
                        <Route
                          path="rooms/:roomId"
                          element={
                            <Chat
                              toggleSideBarHandler={toggleSideBarHandler}
                              setVisible={setVisible}
                              user={user}
                            />
                          }
                        ></Route>
                      </Routes>
                    </WhatsappContextProvider>
                  </div>
                </>
              )}
            </div>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
