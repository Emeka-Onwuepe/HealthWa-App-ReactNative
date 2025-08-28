export interface User {
  _id: string;
  full_name: string;
  email: string;
  role: string;
  profile_image?: string;
  gender?: string;
  phone_number?: string;
}

export interface Prescription {}

export enum APPOINTMENT_STATUS {
  UPCOMING = "upcoming",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  PENDING = "pending",
  ONGOING = "ongoing",
}

export enum APPOINTMENT_TYPE {
  FOLLOW_UP = "follow-up",
  INITIAL_CONSULTATION = "initial-consultation",
  ROUTINE_CHECKUP = "routine-checkup",
  URGENT_CARE = "urgent-care",
  SPECIALIZED_ASSESSMENT = "specialized-assessment",
  PROCEDURE = "procedure",
  VACCINATION = "vaccination",
  THERAPY_SESSION = "therapy-session",
  DIAGNOSTIC_TEST = "diagnostic-test",
  WELLNESS_VISIT = "wellness-visit",
  TELEMEDICINE = "telemedicine",
  PRESCRIPTION_REFILL = "prescription-refill",
  REVIEW_RESULTS = "review-results",
  PRE_OPERATIVE = "pre-operative",
  POST_OPERATIVE = "post-operative",
}

export interface Appointment {
  _id: string;
  type: APPOINTMENT_TYPE;
  symptons: string[];
  preferred_professional?: string;
  preferred_gender?: string;
  doctor: User;
  patient: User;
  schedule: Date;
  status: APPOINTMENT_STATUS;
  created_at: Date;
  updated_at: Date;
}

export interface AppointmentQuery {
  page?: string;
  limit?: string;
  type?: APPOINTMENT_TYPE;
  status?: APPOINTMENT_STATUS[] | APPOINTMENT_STATUS;
  doctor?: string;
  patient?: string;
}

export interface Consultation {
  _id: string;
  appointment: Appointment;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum AppointmentMode {
  ONLINE = "online",
  OFFLINE = "offline",
}
