import { React } from "react";

export default function Rank({ name, entries }) {
  return (
    <>
      <div style={{ textAlign: "center" }} className="white f3 text-ce">
        {`${name}, your current entry count is....`}
      </div>
      <div style={{ textAlign: "center" }} className="white f1">
        {entries}
      </div>
    </>
  );
}
