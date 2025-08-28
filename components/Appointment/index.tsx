import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Appointment({
  name = "Rahul Sharma",
  appointmentType = "General Consultation",
  time = "10.30 AM",
  tokenNumber = "5",
  fees = "₹740",
  status = "Pending",
  startTime = "10 min",
  profileImage,
  onJoinCall,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.timerBadge}>
        <Text style={styles.timerText}>Starts in {startTime}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage} />
            )}
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.appointmentType}>{appointmentType}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.feesContainer}>
              <Text style={styles.feesLabel}>Fees</Text>
              <Text style={styles.feesAmount}>{fees}</Text>
            </View>

            <Text style={styles.statusText}>{status}</Text>

            <View style={styles.tokenContainer}>
              <Text style={styles.tokenLabel}>Token No</Text>
              <Text style={styles.tokenNumber}>{tokenNumber}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.joinCallButton} onPress={onJoinCall}>
        <Text style={styles.joinCallIcon}>📹</Text>
        <Text style={styles.joinCallText}>Join Call</Text>
      </TouchableOpacity>
    </View>
  );
}
