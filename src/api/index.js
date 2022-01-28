import axios from "@/plugins/axios";

export default {
  async createSession() {
    return await axios.get(
      import.meta.env.VITE_API_DOMAINE + "sanctum/csrf-cookie"
    );
  },

  async login(params) {
    await this.createSession();
    return await axios.post("auth/login", params);
  },

  async logout() {
    return await axios.delete("auth/logout");
  },

  async signup(params) {
    await this.createSession();
    return await axios.post("auth/register", params);
  },

  async check(params) {
    return await axios.post("auth/verify", params);
  },

  async getUser() {
    return await axios.get("user");
  },
};
