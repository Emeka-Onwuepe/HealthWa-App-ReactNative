import { useState } from "react";
import { UpdateProfileFormData } from "../screens/Profile";
import { UserService } from "../api/user.service";

export const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (payload: UpdateProfileFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await UserService.updateProfile(payload);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await UserService.updateProfileImage(formData);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (data: {
    new_password: string;
    old_password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await UserService.updatePassword(data);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async (page: number, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await UserService.fetchPatients(page, limit);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await UserService.fetchUser(id);
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
    setError,
    updateProfile,
    uploadProfileImage,
    updatePassword,
    fetchPatients,
    fetchUser,
  };
};
