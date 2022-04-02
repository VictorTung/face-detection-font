import { React } from "react";
import "./FaceRecognition.css";
import { useSelector } from "react-redux";

export default function FaceRecognition() {
  const url = useSelector((state) => state.photo.url);
  const faceBox = useSelector((state) => state.photo.faceBox);

  return (
    <div className="relative img-container">
      <img id="inputImage" src={url} alt="" style={{ width: "700px" }} />

      {faceBox.length > 0 ? (
        <>
          {faceBox.map((box, i) => {
            return (
              <div
                key={i}
                className="faceBox"
                style={{
                  top: box.topRow,
                  bottom: box.bottomRow,
                  left: box.leftCol,
                  right: box.rightCol,
                }}
              ></div>
            );
          })}
        </>
      ) : (
        ""
      )}

      {url && faceBox.length === 0 ? <div className="loading"></div> : ""}
    </div>
  );
}
