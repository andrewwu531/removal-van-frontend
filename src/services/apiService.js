import { authService } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiService = {
  async fetchWithAuth(endpoint, options = {}) {
    const token = authService.getToken();

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      authService.logout();
      window.location.href = "/login";
      throw new Error("Authentication required");
    }

    return response;
  },

  async fetchWithHeaders(endpoint, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        mode: "cors",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // API methods with corrected endpoints (remove /api/backend prefix)
  async getTraders() {
    const response = await this.fetchWithHeaders("/api/backend/traders/");
    return response.json();
  },

  async getTraderById(id) {
    const response = await this.fetchWithHeaders(`/api/backend/traders/${id}/`);
    return response.json();
  },

  async createBooking(bookingData) {
    const response = await this.fetchWithHeaders("/api/backend/bookings/", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
    return response.json();
  },
};
