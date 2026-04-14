import { create } from "zustand";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  checkingAuth: false,
  error: null,

  // ✅ REGISTER
  register: async (formData) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      set({ loading: false });

      toast.success("Account created successfully!");
      return true;

    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
      return false;
    }
  },

  // ✅ LOGIN
  Login: async (credentials) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post("/auth/login", credentials);

      const user = response.data.user;

      // ✅ SAVE TO LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        loading: false,
      });

      toast.success("Logged in successfully!");
      return true;

    } catch (error) {
      const message = error.response?.data?.message || "Login failed";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
      return false;
    }
  },

  // ✅ LOGOUT
  logout: () => {
    localStorage.removeItem("user");

    set({
      user: null,
    });

    toast.success("Logged out successfully");
  },

  // ✅ CHECK AUTH (on app load)
  checkAuth: () => {
    set({ checkingAuth: true });

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      set({ user, checkingAuth: false });
    } else {
      set({ user: null, checkingAuth: false });
    }
  },
}));