import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { sampleAppointments } from "@/types";
import AppointmentCard from "../ui/AppointmentCard";

export default function UpcomingAppointments() {

  const isLoading = false
  const isError = false
  const error: { message?: string } | null = null
  const appointments = sampleAppointments
    

  // const {
  //   data: appointmentsData,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["upcomingAppointments"],
  //   queryFn: fetchUpcomingAppointments,
  // });

  // const appointments: Appointment[] = appointmentsData?.data?.data ?? [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="small" color="#0B8AA0" />
          <Text style={styles.infoText}>Loading appointments...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            Error loading appointments: {(error as { message?: string } | null)?.message || "Unknown error"}
          </Text>
        </View>
      );
    }

    if (!Array.isArray(appointments) || appointments.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.infoText}>No upcoming appointments.</Text>
        </View>
      );
    }

    return appointments.map((appointment) => {
      return (
        <AppointmentCard
          key={appointment.id || Math.random().toString()}
          appointment={appointment}
          // navigation={navigation}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upcoming appointments</Text>
        <Pressable
          // onPress={() =>
          //   navigation.navigate("Appointment", { screen: "Appointment" })
          // }
        >
          <Text style={styles.headerLink}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  headerLink: {
    color: "#0B8AA0",
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {},
  centered: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
});
