import { create } from "zustand";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  error: null,

  register: async (formData) => {
    console.log("Sending data:", formData);

    set({ loading: true, error: null });

    if (formData.password !== formData.confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const response = await axios.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      set({
        user: response.data.user,
        loading: false,
      });

      toast.success("Account created successfully!");
    } catch (error) {
        console.log("REGISTER ERROR:", error.response?.data);
      const message = error.response?.data?.message || "Registration failed";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
    }
  },
  Login: async (credentials) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post("/auth/login", credentials);
        set({
          user: response.data.user,
          loading: false,
        });

        toast.success("Logged in successfully!");
         return true; 
        
    } catch (error) {
        console.log("LOGIN ERROR:", error.response?.data);
        const message = error.response?.data?.message || "Login failed";

      set({
        loading: false,
        error: message,
      });

      toast.error(message);
      return false;
    }

  }

}));