import { React } from "react";
import { Link } from "react-router-dom";

export default function Navigation({ onRouteChange, isSignIn }) {
  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <>
      {isSignIn ? (
        <nav style={navStyle}>
          <Link
            to="/signin"
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </Link>
        </nav>
      ) : (
        <nav style={navStyle}>
          <Link
            to="/signin"
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
            style={navStyle}
          >
            Sign in
          </Link>
          <Link
            to="/register"
            onClick={() => onRouteChange("register")}
            className="f3 link dim black underline pa3 pointer"
            style={navStyle}
          >
            Register
          </Link>
        </nav>
      )}
    </>
  );
}
