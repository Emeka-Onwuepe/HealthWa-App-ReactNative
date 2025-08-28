import { APPOINTMENT_STATUS, AppointmentQuery } from "../types";
import apiClient from "./client";

export const AppointmentService = {
  getUpcomingAppointments: async (query: any) => {
    const response = await apiClient.get("/appointments/doctor", {
      params: {
        status: APPOINTMENT_STATUS.UPCOMING,
        limit: 2,
        page: 1,
      },
    });

    return response.data;
  },

  getAppointments: async (query: AppointmentQuery) => {
    const response = await apiClient.get("/appointments", {
      params: { ...query },
    });

    return response.data;
  },
};
