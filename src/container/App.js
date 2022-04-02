import { React } from "react";
import Particles from "react-tsparticles";
import { useSelector } from "react-redux";
// import { setRoute } from "../action";

import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import LoginAndRegister from "../components/LoginAndRegister/LoginAndRegister";
import "./App.css";

const App = () => {
  const userStatus = useSelector((state) => state.user.status);

  const particlesOption = {
    particles: {
      links: {
        enable: true,
      },
      move: {
        enable: true,
      },
    },
  };

  return (
    <>
      <Particles className="particles" options={particlesOption} />
      {userStatus === "login" ? (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm />
          <FaceRecognition />
        </>
      ) : (
        <LoginAndRegister />
      )}
    </>
  );
};

export default App;
