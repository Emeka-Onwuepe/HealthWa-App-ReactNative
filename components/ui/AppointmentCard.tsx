import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Appointment } from "../../types";
import { getAvatarUrl } from "../../utils/avatars";
import { getTwelveHourFormat } from "../../utils/date";
// import dayjs from "dayjs";
// import { ReminderService } from "../../api/reminder.service";


export default function AppointmentCard({appointment}: {appointment: Appointment}) {
  const patientName = appointment.patient?.full_name || "N/A";
  const consultationType = appointment.type || "Consultation";
  const consultationTime = appointment.schedule
    ? getTwelveHourFormat(new Date(appointment.schedule))
    : "N/A";
  const tokenNumber = "-";
  const status = appointment.status || "Pending";
  const profileImageUrl = appointment.patient?.profile_image;

  // states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const avatarSource = profileImageUrl
    ? { uri: profileImageUrl }
    : { uri: getAvatarUrl(patientName) };

  const handleCreateReminder = async (appointmentId: string) => {
    setLoading(true);
    setError(null);

    // try {
    //   const payload = {
    //     appointment: appointmentId,
    //     time: dayjs(appointment.schedule).subtract(30, "minute").toDate(),
    //   };

    //   console.log(payload);

    //   const res = await ReminderService.createReminder(payload);
    //   Toast.success("Reminder set for 30mins before appointment");
    //   console.log(res);
    //   console.log("Apointment ID", appointmentId);
    // } catch (error) {
    //   console.log("Error creating reminder", error);
    // }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.profileContainer}>
          <Image source={avatarSource} style={styles.profileImage} />
        </View>

        <View style={styles.appointmentDetails}>
          <Text
            style={styles.patientName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {patientName}
          </Text>

          <View style={styles.consultationInfo}>
            <Text
              style={styles.consultationType}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {consultationType}
            </Text>
            <Text style={styles.consultationTime}>{consultationTime}</Text>
          </View>
        </View>

        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>Token No</Text>
          <Text style={styles.tokenNumber}>{tokenNumber}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        {status.toLowerCase() === "pending" ? (
          <Text style={styles.pendingText}>Pending</Text>
        ) : (
          <Text style={styles.completedStatusText}>{status}</Text>
        )}

        {status.toLowerCase() === "completed" && (
          <View style={styles.completedButton}>
            <Ionicons name="checkmark-circle" size={20} color="#3333FF" />
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}

        {status.toLowerCase() === "upcoming" && (
          <Pressable
            style={styles.reminderButton}
            onPress={() => handleCreateReminder(appointment.id)}
          >
            <Text style={styles.reminderText}>Set Reminder</Text>
          </Pressable>
        )}

        {status.toLowerCase() === "ongoing" && (
          <Pressable
            style={styles.callButton}
            // onPress={() => navigation.navigate("Call")}
          >
            <Ionicons name="videocam" size={20} color="#0B8AA0" />
            <Text style={styles.callText}>Join Call</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E7F7FA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    position: "relative",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    borderColor: "#11B3CF",
    borderWidth: 2,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  appointmentDetails: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  consultationInfo: {
    backgroundColor: "#11B3CF1A",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    maxWidth: 141,
  },
  consultationType: {
    fontSize: 13,
    color: "#5D9AC9",
    fontWeight: "500",
  },
  consultationTime: {
    fontSize: 14,
    color: "#5D9AC9",
    fontWeight: "600",
    marginTop: 4,
  },
  tokenContainer: {
    backgroundColor: "#5D9AC9",
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -16,
    top: "50%",
    transform: [{ translateY: -30 }],
  },
  tokenLabel: {
    color: "#fff",
    fontSize: 10,
  },
  tokenNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginTop: 16,
  },
  pendingText: {
    color: "#FFA500",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  completedStatusText: {
    color: "#28A745",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  completedButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
    right: 0,
    top: 5,
  },
  completedText: {
    color: "#3333FF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  reminderButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#F21F61",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
    right: 0,
    top: 5,
  },
  reminderText: {
    color: "#F21F61",
    fontSize: 16,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#0B8AA0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "absolute",
    right: 0,
    top: 5,
    gap: 8,
  },
  callText: {
    color: "#0B8AA0",
    fontSize: 16,
    fontWeight: "bold",
  },
});
