import { APPOINTMENT_STATUS, AppointmentQuery } from "../../types";
import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";

export const fetchAppointments = async (query: AppointmentQuery) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.APPOINTMENT.FETCH, {
      params: {
        ...query,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createAppointment = async (data: any) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.APPOINTMENT.FETCH,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUpcomingAppointments = async () => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.APPOINTMENT.UPCOMING_APPOINTMENTS,
      {
        params: {
          status: APPOINTMENT_STATUS.UPCOMING,
          limit: 2,
          page: 1,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
