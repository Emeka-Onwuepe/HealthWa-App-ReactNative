
  export interface User {
  // general user attr
  id: string;
  full_name: string;
  email: string;
  role: string;
  profile_image?: string;
  gender?: string;
  phone_number?: string;
  about_me: string;
  date_of_birth?: Date | string;
  // doctors attr
  specialization: string;
  license_number: string;
  years_of_experience: Number;
  place_of_work: string;
  city_of_practice: string;
  state_of_practice: string;
  region?: string;
  time_zone?: string;
  // patient attr
  occupation: string;
  weight: string;
  height: string;
  is_diabetic: boolean;
  is_asthmatic: boolean;
  medications: string;
  on_long_term_meds: string;
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

export interface Doctor{
  id: string;
  full_name: string;
  email: string;
  role: string;
  specialization?: string;
  license_number?: string;
  years_of_experience?: number;
  place_of_work?: string;
  city_of_practice?: string;
  state_of_practice?: string;
  region?: string;
  time_zone?: string;
}

export interface Patient{
  id: string;
  full_name: string;
  email: string;
  role: string;
  occupation?: string;
  weight?: string;
  height?: string;
  is_diabetic?: boolean;
  is_asthmatic?: boolean;
  medications?: string;
  on_long_term_meds?: string;
}

export interface Appointment {
  id: string;
  type: APPOINTMENT_TYPE;
  symptons: string[];
  preferred_professional?: string;
  preferred_gender?: string;
  doctor: Doctor;
  patient: Patient;
  patient_id: string;
  schedule: Date;
  status: APPOINTMENT_STATUS;
  created_at: Date;
  updated_at: Date;
}

export const sampleAppointments = [
  {
    id: "1",
    type: APPOINTMENT_TYPE.INITIAL_CONSULTATION,
    symptons: ["fever", "cough"],
    doctor: {
      id: "d1",
      full_name: "Dr. John Doe",
      email: "john.doe@hospital.com",
      role: "doctor",
    },
    patient: {
      id: "p1",
      full_name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "patient",
    },
    patient_id: "p1",
    schedule: new Date("2024-07-01T10:00:00Z"),
    status: APPOINTMENT_STATUS.UPCOMING,
    created_at: new Date("2024-06-20T09:00:00Z"),
    updated_at: new Date("2024-06-20T09:00:00Z"),
  },
  {
    id: "2",
    type: APPOINTMENT_TYPE.FOLLOW_UP,
    symptons: ["headache"],
    doctor: {
      id: "d2",
      full_name: "Dr. Alice Brown",
      email: "alice.brown@hospital.com",
      role: "doctor",
    },
    patient: {
      id: "p2",
      full_name: "Bob Johnson",
      email: "bob.johnson@email.com",
      role: "patient",
    },
    patient_id: "p2",
    schedule: new Date("2024-07-02T14:30:00Z"),
    status: APPOINTMENT_STATUS.COMPLETED,
    created_at: new Date("2024-06-21T11:00:00Z"),
    updated_at: new Date("2024-07-02T15:00:00Z"),
  },
  // ongoing
  {
    id: "3",
    type: APPOINTMENT_TYPE.URGENT_CARE,
    symptons: ["chest pain"],
    doctor: {
      id: "d3",
      full_name: "Dr. Emily White",
      email: "emily.white@hospital.com",
      role: "doctor",
    },
    patient: {
      id: "p3",
      full_name: "Charlie Brown",
      email: "charlie.brown@email.com",
      role: "patient",
    },
    patient_id: "p3",
    schedule: new Date("2024-07-03T09:00:00Z"),
    status: APPOINTMENT_STATUS.ONGOING,
    created_at: new Date("2024-06-22T10:00:00Z"),
    updated_at: new Date("2024-06-22T10:00:00Z"),
  },
];



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
