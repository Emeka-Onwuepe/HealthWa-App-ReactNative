import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USER.GET_PROFILE);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDoctorProfile = async (profileData) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.USER.SETUP_DOCTOR_PROFILE,
      profileData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    throw error;
  }
};

export const setupPatientProfile = async (data) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.USER.SETUP_PATIENT_PROFILE,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error setting up patient profile:", error);
    throw error;
  }
};
