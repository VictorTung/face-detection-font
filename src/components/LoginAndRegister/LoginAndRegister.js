import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSignin } from "../../features/userSlice";
import { changeRoute } from "../../features/routeSlice";

import "./LoginAndRegister.css";

const LoginAndRegister = (props) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const route = useSelector((state) => state.route.value);
  const userStatus = useSelector((state) => state.user.status);

  function warningMessageForRegister() {
    const name = inputName ? "" : "name";
    const email = inputEmail ? "" : "email";
    const password = inputPassword ? "" : "password";

    const string = [name, email, password].filter((item) => item).join(", ");

    return setMessage(`Please enter ${string} `);
  }

  const onSigninOrRegisterSumbit = (e) => {
    if (route == "register") {
      if (!inputEmail || !inputPassword || !inputName) {
        warningMessageForRegister();
      }
    } else {
      if (!inputEmail && !inputPassword) {
        setMessage("Please enter email & password");
      } else if (!inputPassword) {
        setMessage("Please enter password");
      } else if (!inputEmail) {
        setMessage("Please enter email");
      }
    }

    if (inputEmail && inputPassword && route == "signin") {
      dispatch(
        userSignin({
          email: inputEmail,
          password: inputPassword,
        })
      );
    }

    if (inputEmail && inputPassword && inputName && route == "register") {
      dispatch(
        userSignin({
          name: inputName,
          email: inputEmail,
          password: inputPassword,
        })
      );
    }
  };

  return (
    <>
      <div className="container">
        {userStatus == "loading" ? (
          <div className="loadingUser">Loading</div>
        ) : (
          ""
        )}
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">
            {route == "signin" ? "Sign In" : "Register"}
          </legend>
          <div className="mt3">
            {route == "signin" ? (
              <div className="f4">
                <div>You can login by using this fake account:</div>
                <br />
                <div>email: fake@gamil.com</div>
                <div>password: fake</div>
                <br />
              </div>
            ) : (
              <>
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Name
                </label>
                <input
                  onChange={(e) => setInputName(e.target.value)}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 mb3"
                  type="text"
                  name="name"
                  id="name"
                />
              </>
            )}
            <label className="db fw6 lh-copy f6" htmlFor="email-address">
              Email
            </label>
            <input
              onChange={(e) => setInputEmail(e.target.value)}
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setInputPassword(e.target.value)}
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="password"
              id="password"
            />
          </div>
        </fieldset>
        <div className="">
          <input
            onClick={onSigninOrRegisterSumbit}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
          />
        </div>
        {route == "signin" ? (
          <div className="lh-copy mt3">
            <p
              onClick={() => dispatch(changeRoute("register"))}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      {message ? (
        <div className="message">{message}</div>
      ) : userStatus == "fail" ? (
        <div className="message">Wrong email or password</div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginAndRegister;
