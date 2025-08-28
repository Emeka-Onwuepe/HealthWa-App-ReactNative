import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const fetchConsultations = async (page: number, limit: number) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.CONSULTATION.FETCH, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const startConsultation = async (appointment_id: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CONSULTATION.START, {
      appointment_id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchConsultation = async (consultationId: string) => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.CONSULTATION.FETCH_ONE(consultationId)
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
