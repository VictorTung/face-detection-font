import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignout } from "../../features/userSlice";
import { changeRoute } from "../../features/routeSlice";
import { Link } from "react-router-dom";

export default function Navigation() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);

  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <>
      {userStatus == "login" ? (
        <nav
          style={navStyle}
          onClick={() => dispatch(userSignout())}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </nav>
      ) : (
        <nav style={navStyle}>
          <div
            onClick={() => dispatch(changeRoute('signin'))}
            className="f3 link dim black underline pa3 pointer"
            style={navStyle}
          >
            Sign in
          </div>
          <div
            onClick={() => dispatch(changeRoute('register'))}
            className="f3 link dim black underline pa3 pointer"
            style={navStyle}
          >
            Register
          </div>
        </nav>
      )}
    </>
  );
}
