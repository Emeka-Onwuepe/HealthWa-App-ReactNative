import { SignupFormData } from "../screens/Signup";
import apiClient from "./client";

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
  register: async (data: SignupFormData) => {
    delete data.confirm_password;
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },
  verifyEmail: async (email: string, code: string) => {
    const response = await apiClient.post("/auth/email/verify", {
      email,
      code,
    });
    return response.data;
  },
};
