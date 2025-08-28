import apiClient from "./client";

export const PrescriptionService = {
  getPrescriptions: async (query: any) => {
    const response = await apiClient.get("/prescriptions", {
      params: query,
    });
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post("/prescriptions", data);
    return response.data;
  },
};
