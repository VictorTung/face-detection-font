import { React } from "react";
import "./ImageLinkForm.css";

export default function ImageLinkForm({ onChange, onPictureSubmit }) {

  return (
    <>
      <div>
        <p className="f3" style={{ textAlign: "center" }}>
          {"face recognition"}
        </p>
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer"
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
}
