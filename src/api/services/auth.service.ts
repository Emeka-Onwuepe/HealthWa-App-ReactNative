import { API_ENDPOINTS } from "../endpoints";
import apiClient from "../client";

export const login = async (payload: {
  email: string;
  password: string;
  remember_me: boolean;
}) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async (payload) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyEmail = async (payload: { email: string; code: string }) => {
  try {
    console.log(payload);
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resendEmailVerification = async (payload) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.RESEN_EMAIL_VERIFICATION,
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
