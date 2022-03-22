import { Component, React } from "react";

export default class LoginAndRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPassword: "",
      inputName: "",
    };
  }

  onInputNameChange = (e) => {
    this.setState({ inputName: e.target.value });
  };

  onInputEmailChange = (e) => {
    this.setState({ inputEmail: e.target.value });
  };

  onInputPasswordChange = (e) => {
    this.setState({ inputPassword: e.target.value });
  };

  onSigninOrRegisterSumbit = (e) => {
    const { inputEmail, inputName, inputPassword } = this.state;
    if (
      !inputEmail || !inputPassword || this.props.route == "signin"
        ? false
        : !inputName
    ) {
      return;
    }
    fetch(
      `https://peaceful-oasis-74145.herokuapp.com/${
        this.props.route == "signin" ? "signin" : "register"
      }`,
      {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: inputName,
          email: inputEmail,
          password: inputPassword,
        }),
      }
    )
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { onRouteChange, route } = this.props;
    return (
      <>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">
                  {route == "signin" ? "Sign In" : "Register"}
                </legend>
                <div className="mt3">
                  {route == "signin" ? (
                    ""
                  ) : (
                    <>
                      <label
                        className="db fw6 lh-copy f6"
                        htmlFor="email-address"
                      >
                        Name
                      </label>
                      <input
                        onChange={this.onInputNameChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 mb3"
                        type="text"
                        name="name"
                        id="name"
                      />
                    </>
                  )}
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    onChange={this.onInputEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={this.onInputPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSigninOrRegisterSumbit}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
              {route == "signin" ? (
                <div className="lh-copy mt3">
                  <p
                    onClick={() => onRouteChange("register")}
                    className="f6 link dim black db pointer"
                  >
                    Register
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </main>
        </article>
      </>
    );
  }
}
