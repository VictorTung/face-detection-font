import { React } from "react";
import { useSelector } from "react-redux";

export default function Rank() {
  const { name, entries } = useSelector((state) => state.user.value);

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
