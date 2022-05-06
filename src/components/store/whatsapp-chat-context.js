import { createContext } from "react";
import db from "../firebase";
import firebase from "firebase/compat/app";

export const whatsappContext = createContext({
  deleteRoom: (id) => {},
  addRoom: (roomName) => {},
  setUniversalStats: (message) => {},
});

const addRoom = async (roomName, userName) => {
  if (roomName.trim() === "") return;
  try {
    await db.collection("rooms").add({
      name: roomName,
      createdby: userName,
    });
  } catch (e) {
    console.log(e);
  }
};

const setUniversalStats = async (message, userName) => {
  try {
    await db.collection("stats").doc("lastStats").update({
      message: message,
      by: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteRoom = async (id) => {
  try {
    await db.collection("rooms").doc(id).delete();
  } catch (e) {
    console.log(e);
  }
};

const WhatsappContextProvider = (props) => {
  return (
    <whatsappContext.Provider
      value={{
        addRoom,
        deleteRoom,
        setUniversalStats,
      }}
    >
      {props.children}
    </whatsappContext.Provider>
  );
};

export default WhatsappContextProvider;
