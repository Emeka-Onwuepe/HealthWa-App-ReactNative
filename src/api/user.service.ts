import apiClient from "./client";

export const UserService = {
  getProfile: async () => {
    const response = await apiClient.get("/user/profile");
    return response.data;
  },
  updateProfile: async (data: any) => {
    delete data.email;
    const response = await apiClient.patch("/user/profile", data);
    return response.data;
  },
  updateProfileImage: async (formData: FormData) => {
    const response = await apiClient.patch("/user/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  updatePassword: async (data: {
    old_password: string;
    new_password: string;
  }) => {
    const response = await apiClient.patch("/user/change-password", data);
    return response.data;
  },
  fetchPatients: async (page: number, limit: number) => {
    const response = await apiClient.get("/user/patients", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },
  fetchUser: async (id: string) => {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  },
};
