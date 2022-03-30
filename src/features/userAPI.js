class UserAPI {
  constructor() {
    this.baseURL = "https://peaceful-oasis-74145.herokuapp.com";
  }

  post(param, { email = "", password = "", name = "" }) {
    console.log(email, password, name)
    return fetch(`${this.baseURL}${param}`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
  }
}

const userAPI = new UserAPI();
export default userAPI;
