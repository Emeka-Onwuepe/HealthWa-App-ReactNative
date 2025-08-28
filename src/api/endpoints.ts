export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEN_EMAIL_VERIFICATION: "/auth/resend-email-verification",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  CONSULTATION: {
    FETCH: "/consultation",
    START: "/consultation",
    FETCH_ONE: (id: string) => `/consultation/${id}`,
  },
  USER: {
    GET_PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    SETUP_DOCTOR_PROFILE: "/user/setup-profile",
    SETUP_PATIENT_PROFILE: "/user/setup-patient-profile",
  },
  APPOINTMENT: {
    FETCH: "/appointments",
    UPCOMING_APPOINTMENTS: "/appointments/doctor",
  },
};
