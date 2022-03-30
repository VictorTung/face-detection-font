import { React, useState } from "react";
import Particles from "react-tsparticles";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setRoute } from "../action";

import { fetchUser } from "../features/userSlice";

import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import LoginAndRegister from "../components/LoginAndRegister/LoginAndRegister";
import "./App.css";

// const initialUser = {
//   id: "26",
//   name: "",
//   password: "",
//   email: "",
//   entries: 0,
//   joined: "",
// };

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = intialState;
  // }

  const [input, setInput] = useState(
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/woman-hiking-at-red-rock-canyon-during-sunset-with-royalty-free-image-1601478369.jpg"
  );
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  // const [route, setRoute] = useState("signin");
  // const [isSignIn, setIsSignIn] = useState(true);
  // const [user, setUser] = useState(initialUser);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const userStatus = useSelector((state) => state.user.status);

  // const loadUser = (data) => {
  //   setUser({
  //     id: data.id,
  //     name: data.name,
  //     password: data.password,
  //     email: data.email,
  //     entries: data.entries,
  //     joined: data.joined,
  //   });
  // };

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
    setBoxes([]);
    setImageUrl(input);

    // fetch("https://peaceful-oasis-74145.herokuapp.com/img", {
    fetch("http://localhost:3001/img", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        imgURL: input,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setUser({ ...user, entries: data.entries });

        data.results.outputs[0].data.regions.forEach((data) => {
          const boxValue = boxCalculation(data.region_info.bounding_box);
          setBoxes([...boxes, boxValue]);
        });
      })
      .catch((err) => console.log(err));
  };

  // const onRouteChange = (route) => {
  //   if (route == "home") {
  //     setIsSignIn(true);
  //   } else {
  //     setUser(initialUser);
  //   }
  //   setRoute(route);
  // };

  // const dispatch = useDispatch()
  // const user = useSelector(state=>state.user.value)
  // const status = useSelector(state=>state.user.status)

  return (
    <BrowserRouter>
      <Particles
        className="particles"
        options={{
          particles: {
            links: {
              enable: true,
            },
            move: {
              enable: true,
            },
          },
        }}
      />
      {/* <Navigation onRouteChange={onRouteChange} isSignIn={isSignIn} /> */}
      <Navigation />
      {userStatus === "signin" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            input={input}
            onChange={(e) => setInput(e.target.value)}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </>
      ) : (
        <LoginAndRegister />
        // <LoginAndRegister
        //   loadUser={loadUser}
        //   onRouteChange={onRouteChange}
        //   route={route}
        // />
      )}
    </BrowserRouter>
  );
};

export default App;
