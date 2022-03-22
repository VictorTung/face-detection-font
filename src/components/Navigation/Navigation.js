import { React } from "react";

export default function Navigation({ onRouteChange, isSignIn }) {
  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <>
      {isSignIn ? (
        <nav style={navStyle}>
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      ) : (
        <nav style={navStyle}>
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
            style={navStyle}
          >
            Sign in
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link dim black underline pa3 pointer"
            style={navStyle}
          >
            Register
          </p>
        </nav>
      )}
    </>
  );
}
