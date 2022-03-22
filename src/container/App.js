import { Component, React } from "react";
// import Particles from "react-tsparticles";

import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import LoginAndRegister from "../components/LoginAndRegister/LoginAndRegister";
import "./App.css";

const intialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignIn: false,
  user: {
    id: "",
    name: "",
    password: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

export default class App extends Component {
  constructor() {
    super();
    this.state = intialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        password: data.password,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  createBox = (newBox) => {
    this.setState({ boxes: [...this.state.boxes, newBox] });
  };

  boxCalculation = ({ bottom_row, left_col, right_col, top_row }) => {
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

  onChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onPictureSubmit = (e) => {
    this.setState({ boxes: [] });
    this.setState({ imageUrl: this.state.input });

    fetch("https://peaceful-oasis-74145.herokuapp.com/img", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
        imgURL: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          user: Object.assign(this.state.user, {
            entries: data.entries,
          }),
        });

        data.results.outputs[0].data.regions.forEach((data) => {
          this.createBox(this.boxCalculation(data.region_info.bounding_box));
        });
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route == "home") {
      this.setState({ isSignIn: true });
    } else {
      this.setState(intialState);
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignIn, boxes, imageUrl, route } = this.state;

    return (
      <>
        {/* <Particles
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
        /> */}
        <Navigation onRouteChange={this.onRouteChange} isSignIn={isSignIn} />
        {isSignIn ? (
          <>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onChange={this.onChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
          </>
        ) : (
          <LoginAndRegister
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            route={route}
          />
        )}
      </>
    );
  }
}
