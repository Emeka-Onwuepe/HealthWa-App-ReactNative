import apiClient from "./client";

export const ReminderService = {
  createReminder: async (data) => {
    const response = await apiClient.post("/reminders", data);
    return response.data;
  },
};
