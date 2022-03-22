import { React } from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./brain.png";

export default function Logo() {
  return (
    <Tilt
      className="tilt ma4 mt0 br2 shadow-2"
      style={{
        height: "150px",
        width: "150px",
        backgroundColor: "none",
        padding: '20px',
      }}
    >
      <img style={{ width: "120px" }} src={brain} alt="" />
    </Tilt>
  );
}
