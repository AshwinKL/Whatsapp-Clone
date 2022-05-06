import "./NotificationModal.css";
import ReactDOM from "react-dom";
import { useEffect } from "react";

const Notification = (props) => {
  return (
    <div className="notification__container">
      <p>{props.message}</p>
    </div>
  );
};

const NotificationModal = (props) => {
  const { setVisible, visible } = props;
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [setVisible, visible]);
  if (!visible) return;
  return (
    <>
      {ReactDOM.createPortal(
        <Notification message={props.notiMessage} />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default NotificationModal;
