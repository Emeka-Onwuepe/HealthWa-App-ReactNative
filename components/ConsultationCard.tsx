import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { User } from "../types";
import { getAvatarUrl } from "../utils/avatars";
import { Feather } from "@expo/vector-icons";
import { toTitleCase } from "../utils/strings";
import { getDateFormat } from "../utils/date";

interface PatientCardProps {
  consultation: Partial<any>;
  onViewConsulation?: () => void;
  showPresciptionButton?: boolean;
}

export default function ConsultationCard({
  consultation,
  onViewConsulation,
  showPresciptionButton = true,
}: PatientCardProps) {
  const { appointment } = consultation;
  const { patient } = appointment;
  const avatarUrl = getAvatarUrl(patient.full_name || "");
  const imageSource = patient.profile_image
    ? { uri: patient.profile_image }
    : { uri: avatarUrl };

  return (
    <View style={styles.cardOuterContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.cardTopContent}>
          <View style={styles.imageWrapper}>
            <Image source={imageSource} style={styles.profileImage} />
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.patientName}>
              {toTitleCase(patient.full_name)}
            </Text>

            <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                <Text style={styles.typeValue}>{appointment.type}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.dateValue}>
                  {getDateFormat(new Date(appointment.created_at))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {showPresciptionButton && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.prescriptionButton}
            onPress={onViewConsulation}
          >
            <Feather name="clipboard" size={20} color="#5DA7C5" />
            <Text style={styles.prescriptionButtonText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardOuterContainer: {
    position: "relative",
    marginBottom: 24,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#DDE5E8",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTopContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  imageWrapper: {
    width: 102,
    height: 102,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#11B3CF",
    marginRight: 16,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#202020",
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: "#11B3CF1A",
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 16,
    color: "#4A7F95",
    marginRight: 4,
  },
  typeValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B8AA0",
  },
  dateValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F21F61",
  },
  actionContainer: {
    position: "absolute",
    bottom: -15,
    right: 20,
    zIndex: 2,
  },
  prescriptionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE5E8",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  prescriptionButtonText: {
    color: "#5DA7C5",
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 8,
  },
});
