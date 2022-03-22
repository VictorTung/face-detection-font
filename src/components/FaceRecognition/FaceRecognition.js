import { React } from "react";
import "./FaceRecognition.css";

export default function FaceRecognition({ imageUrl, boxes }) {
  return (
    <div
      className="center relative"
      style={{
        // display: "flex",
        // justifyContent: "center",
        width: "700px",
        overflow: "hidden",
      }}
    >

      <img id="inputImage" src={imageUrl} alt="" style={{ width: "700px" }} />

      {boxes.length > 0 ? (
        <>
          {boxes.map((box, i) => {
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

      {
        imageUrl&&boxes.length==0?
        <div className="loading"></div>
        :
        ""
      }

    </div>
  );
}
