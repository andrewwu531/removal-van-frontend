const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  // Get token
  async login(username, password) {
    const response = await fetch(`${API_URL}/api/backend/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  },

  // Remove token
  logout() {
    localStorage.removeItem("token");
  },

  // Get current token
  getToken() {
    return localStorage.getItem("token");
  },
};
