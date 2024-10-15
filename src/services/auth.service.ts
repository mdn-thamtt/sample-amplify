import axios from "axios";

class AuthService {
  async login(username: string, password: string) {
    const loginResponse: any = await axios.post("/login", {
      username,
      password,
    });

    if (loginResponse.data.token) {
      localStorage.setItem("accessToken", `Bearer ${loginResponse.data.token}`);
    }

    return loginResponse.data;
  }

  logout() {
    localStorage.removeItem("accessToken");
  }
}

const authService = new AuthService();

export default authService;
