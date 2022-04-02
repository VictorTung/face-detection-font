import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignout } from "../../features/userSlice";
import { changeRoute } from "../../features/routeSlice";
import {
  changeEmail,
  changeName,
  changePassword,
} from "../../features/inputSlice";
import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userStatus = useSelector((state) => state.user.status);
  const inputName = useSelector((state) => state.input.name);
  const inputPassword = useSelector((state) => state.input.password);
  const inputEmail = useSelector((state) => state.input.email);

  const clearInput = () => {
    dispatch(changeName(""));
    dispatch(changeEmail(""));
    dispatch(changePassword(""));
  };

  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <nav className="nav-bar">
      <div className="nav-route">
        <ul>
          <li>
            <Link to="/react-query">react-query</Link>
          </li>
          <li>
            <Link to="/redux-query">redux-query</Link>
          </li>
        </ul>
      </div>

      {location.pathname !== "/" ? (
        <div>
          <ul>
            <li>
              <Link to="/" onClick={clearInput}>
                Home
              </Link>
            </li>
          </ul>
        </div>
      ) : userStatus === "login" ? (
        <div
          style={navStyle}
          onClick={() => {
            clearInput();
            dispatch(userSignout());
          }}
        >
          Sign Out
        </div>
      ) : (
        <div style={navStyle}>
          <ul className="nav-list">
            <li
              onClick={() => {
                clearInput();
                dispatch(changeRoute("signin"));
              }}
              style={navStyle}
            >
              Sign in
            </li>
            <li
              onClick={() => {
                clearInput();
                dispatch(changeRoute("register"));
              }}
              style={navStyle}
            >
              Register
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
