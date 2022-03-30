import React, { useState } from "react";
import "./ImageLinkForm.css";
import { useSelector, useDispatch } from "react-redux";
import { showPhoto, showFaceBox, clearPhoto } from "../../features/photoSlice";
import { entriesUpdate } from "../../features/userSlice";

export default function ImageLinkForm() {
  const dispatch = useDispatch();
  const faceBox = useSelector((state) => state.photo.faceBox);
  const user = useSelector((state) => state.user.value);

  const [input, setInput] = useState("");

  const boxCalculation = ({ bottom_row, left_col, right_col, top_row }) => {
    const img = document.querySelector("#inputImage");
    const height = Number(img.height);
    const width = Number(img.width);
    return {
      topRow: top_row * height,
      bottomRow: height - bottom_row * height,
      leftCol: left_col * width,
      rightCol: width - right_col * width,
    };
  };

  const onPictureSubmit = (e) => {
    dispatch(clearPhoto());
    dispatch(showPhoto(input));

    fetch("https://peaceful-oasis-74145.herokuapp.com/img", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        imgURL: input,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(entriesUpdate(data.entries));

        data.results.outputs[0].data.regions.forEach((data) => {
          const boxValue = boxCalculation(data.region_info.bounding_box);
          dispatch(showFaceBox(boxValue));
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <div className="text-container">
          <p className="f3" style={{ textAlign: "center" }}>
            Face Recognition
          </p>
          <p className="f3" style={{ textAlign: "center" }}>
            Enter a photo link including a human face as many as possible
          </p>
          <p className="f3" style={{ textAlign: "center" }}>
            such as:
            https://assets-global.website-files.com/61766c42e8e50c99a04fbd4b/61c248cf867648b1c41c90f7_rfh%20working%20session%20recap%201.png
          </p>
        </div>
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
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
