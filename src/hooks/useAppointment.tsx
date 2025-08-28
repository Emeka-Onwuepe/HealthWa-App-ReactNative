import { useState } from "react";
import { AppointmentService } from "../api/appointment.service";
import { AppointmentQuery } from "../types";

export const useAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDoctorUpcomingAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await AppointmentService.getUpcomingAppointments({});
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAppointments = async (query: AppointmentQuery) => {
    setLoading(true);
    setError(null);

    try {
      const res = await AppointmentService.getAppointments(query);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getDoctorUpcomingAppointments,
    getAppointments,
  };
};
