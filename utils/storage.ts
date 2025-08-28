import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/**
 * Store a string value in AsyncStorage
 */
export const storeValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error("Error storing value:", error);
    return false;
  }
};

/**
 * Store an object value in AsyncStorage
 */
export const storeObjectValue = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error("Error storing object value:", error);
    return false;
  }
};

/**
 * Get a string value from AsyncStorage
 */
export const getValue = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error("Error retrieving value:", error);
    return null;
  }
};

/**
 * Get an object value from AsyncStorage
 */
export const getObjectValue = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving object value:", error);
    return null;
  }
};

/**
 * Remove a value from AsyncStorage
 */
export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing value:", error);
    return false;
  }
};

/**
 * Clear all values from AsyncStorage
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing storage:", error);
    return false;
  }
};

/**
 * Get all keys from AsyncStorage
 */
export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error("Error getting all keys:", error);
    return null;
  }
};

/**
 * Get multiple items from AsyncStorage
 */
export const getMultiple = async (keys) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (error) {
    console.error("Error getting multiple values:", error);
    return null;
  }
};

// =====================================================
// Secure Storage for sensitive data (auth tokens, PHI)
// =====================================================

/**
 * Check if SecureStore is available on this platform
 */
export const isSecureStoreAvailable = () => {
  return Platform.OS === "ios" || Platform.OS === "android";
};

/**
 * Store a value securely
 * Falls back to AsyncStorage on web platforms
 */
export const setSecureValue = async (key, value) => {
  try {
    if (isSecureStoreAvailable()) {
      await SecureStore.setItemAsync(key, value);
    } else {
      await AsyncStorage.setItem(`secure_${key}`, value);
    }
    return true;
  } catch (error) {
    console.error("Error storing secure value:", error);
    return false;
  }
};

/**
 * Store an object securely
 */
export const setSecureObjectValue = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    return await setSecureValue(key, jsonValue);
  } catch (error) {
    console.error("Error storing secure object value:", error);
    return false;
  }
};

/**
 * Get a value from secure storage
 */
export const getSecureValue = async (key) => {
  try {
    if (isSecureStoreAvailable()) {
      return await SecureStore.getItemAsync(key);
    } else {
      return await AsyncStorage.getItem(`secure_${key}`);
    }
  } catch (error) {
    console.error("Error retrieving secure value:", error);
    return null;
  }
};

/**
 * Get an object from secure storage
 */
export const getSecureObjectValue = async (key) => {
  try {
    const jsonValue = await getSecureValue(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving secure object value:", error);
    return null;
  }
};

/**
 * Remove a value from secure storage
 */
export const removeSecureValue = async (key) => {
  try {
    if (isSecureStoreAvailable()) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await AsyncStorage.removeItem(`secure_${key}`);
    }
    return true;
  } catch (error) {
    console.error("Error removing secure value:", error);
    return false;
  }
};

// =====================================================
// Healthcare-specific storage helpers
// =====================================================

export const StorageKeys = {
  // Auth related
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER_PROFILE: "user_profile",

  // Patient data
  PATIENT_PROFILE: "patient_profile",
  RECENT_APPOINTMENTS: "recent_appointments",
  ACTIVE_PRESCRIPTIONS: "active_prescriptions",
  MEDICAL_HISTORY: "medical_history",

  // App settings
  APP_THEME: "app_theme",
  NOTIFICATION_SETTINGS: "notification_settings",
  LANGUAGE: "language",
  ONBOARDING_COMPLETED: "onboarding_completed",

  // Misc
  LAST_SYNC_TIMESTAMP: "last_sync_timestamp",
  OFFLINE_DATA: "offline_data",
};

/**
 * Save user authentication data securely
 */
export const saveAuthData = async (authData) => {
  try {
    const { token, refreshToken, user } = authData;

    await setSecureValue(StorageKeys.AUTH_TOKEN, token);
    await setSecureValue(StorageKeys.REFRESH_TOKEN, refreshToken);
    await storeObjectValue(StorageKeys.USER_PROFILE, user);

    return true;
  } catch (error) {
    console.error("Error saving auth data:", error);
    return false;
  }
};

/**
 * Clear all authentication data during logout
 */
export const clearAuthData = async () => {
  try {
    await removeSecureValue(StorageKeys.AUTH_TOKEN);
    await removeSecureValue(StorageKeys.REFRESH_TOKEN);
    await removeValue(StorageKeys.USER_PROFILE);

    return true;
  } catch (error) {
    console.error("Error clearing auth data:", error);
    return false;
  }
};

/**
 * Get the complete authentication state
 */
export const getAuthState = async () => {
  try {
    const token = await getSecureValue(StorageKeys.AUTH_TOKEN);

    if (!token) {
      return null;
    }

    const refreshToken = await getSecureValue(StorageKeys.REFRESH_TOKEN);
    const user = await getObjectValue(StorageKeys.USER_PROFILE);

    return {
      token,
      refreshToken,
      user,
    };
  } catch (error) {
    console.error("Error getting auth state:", error);
    return null;
  }
};

/**
 * Save patient medical data securely
 */
export const saveMedicalData = async (key, data) => {
  try {
    return await setSecureObjectValue(key, data);
  } catch (error) {
    console.error(`Error saving medical data for ${key}:`, error);
    return false;
  }
};

/**
 * Get patient medical data
 */
export const getMedicalData = async (key) => {
  try {
    return await getSecureObjectValue(key);
  } catch (error) {
    console.error(`Error retrieving medical data for ${key}:`, error);
    return null;
  }
};

/**
 * Save app settings (non-sensitive)
 */
export const saveAppSettings = async (settings) => {
  try {
    const existingSettings = (await getAppSettings()) || {};
    const updatedSettings = { ...existingSettings, ...settings };

    return await storeObjectValue("app_settings", updatedSettings);
  } catch (error) {
    console.error("Error saving app settings:", error);
    return false;
  }
};

/**
 * Get app settings
 */
export const getAppSettings = async () => {
  try {
    return await getObjectValue("app_settings");
  } catch (error) {
    console.error("Error retrieving app settings:", error);
    return null;
  }
};

/**
 * Save appointment reminder
 */
export const saveAppointment = async (appointment) => {
  try {
    const appointments = (await getAppointments()) || [];

    const existingIndex = appointments.findIndex(
      (a) => a.id === appointment.id
    );

    if (existingIndex >= 0) {
      appointments[existingIndex] = appointment;
    } else {
      appointments.push(appointment);
    }

    appointments.sort((a, b) => new Date(a.date) - new Date(b.date));

    return await setSecureObjectValue(
      StorageKeys.RECENT_APPOINTMENTS,
      appointments
    );
  } catch (error) {
    console.error("Error saving appointment:", error);
    return false;
  }
};

/**
 * Get all appointments
 */
export const getAppointments = async () => {
  try {
    return await getSecureObjectValue(StorageKeys.RECENT_APPOINTMENTS);
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    return null;
  }
};

/**
 * Save prescription data
 */
export const savePrescription = async (prescription) => {
  try {
    const prescriptions = (await getPrescriptions()) || [];

    const existingIndex = prescriptions.findIndex(
      (p) => p.id === prescription.id
    );

    if (existingIndex >= 0) {
      prescriptions[existingIndex] = prescription;
    } else {
      prescriptions.push(prescription);
    }

    return await setSecureObjectValue(
      StorageKeys.ACTIVE_PRESCRIPTIONS,
      prescriptions
    );
  } catch (error) {
    console.error("Error saving prescription:", error);
    return false;
  }
};

/**
 * Get all prescriptions
 */
export const getPrescriptions = async () => {
  try {
    return await getSecureObjectValue(StorageKeys.ACTIVE_PRESCRIPTIONS);
  } catch (error) {
    console.error("Error retrieving prescriptions:", error);
    return null;
  }
};

/**
 * Save the last sync timestamp for offline data management
 */
export const saveLastSyncTimestamp = async (timestamp = Date.now()) => {
  try {
    return await storeValue(
      StorageKeys.LAST_SYNC_TIMESTAMP,
      timestamp.toString()
    );
  } catch (error) {
    console.error("Error saving sync timestamp:", error);
    return false;
  }
};

/**
 * Get the last sync timestamp
 */
export const getLastSyncTimestamp = async () => {
  try {
    const timestamp = await getValue(StorageKeys.LAST_SYNC_TIMESTAMP);
    return timestamp ? parseInt(timestamp, 10) : null;
  } catch (error) {
    console.error("Error retrieving sync timestamp:", error);
    return null;
  }
};

export default {
  // Regular storage
  storeValue,
  storeObjectValue,
  getValue,
  getObjectValue,
  removeValue,
  clearAll,
  getAllKeys,
  getMultiple,

  // Secure storage
  setSecureValue,
  setSecureObjectValue,
  getSecureValue,
  getSecureObjectValue,
  removeSecureValue,

  // Healthcare specific
  StorageKeys,
  saveAuthData,
  clearAuthData,
  getAuthState,
  saveMedicalData,
  getMedicalData,
  saveAppSettings,
  getAppSettings,
  saveAppointment,
  getAppointments,
  savePrescription,
  getPrescriptions,
};
