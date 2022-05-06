import "./Login.css";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserHandler }) => {
  const navigate = useNavigate();
  const signInHandler = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        setUserHandler(res.user);
        navigate("/rooms");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login__text">
          <h1>
            <p>Sign in to</p> Whats<span>Down</span>
          </h1>
        </div>
        <div className="login__buttonContainer">
          <GoogleButton className="login__button" onClick={signInHandler} />
        </div>
        <p>
          Tired of logging in using phone number? <br /> Use google login
        </p>
        <p>
          Made with ❤️ by{" "}
          <a href="https://www.linkedin.com/in/ashwinkl/">Ashwin K L</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
