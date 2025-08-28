import { useState } from "react";
import { PrescriptionService } from "../api/prescription.service";

interface FetchPrescriptionsPayload {
  page: number;
  limit: number;
  patient?: string;
  doctor?: string;
}

export const usePrescription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPrescription = async (payload: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await PrescriptionService.create(payload);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchPrescriptions = async (payload: FetchPrescriptionsPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await PrescriptionService.getPrescriptions(payload);
      return res.data;
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
    setLoading,
    setError,
    createPrescription,
    fetchPrescriptions,
  };
};
