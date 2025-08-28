import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "../../components/ui/PageHeader";

import styles from "./styles";
import { fetchConsultation } from "../../api/services/consultation.service";
import { getAvatarUrl } from "../../utils/avatars";
import { toTitleCase } from "../../utils/strings";
import { useQuery } from "@tanstack/react-query";

export default function ConsultationDetail({ route }) {
  const { consultationId } = route.params || {};

  const {
    data: consultationData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["consultation", consultationId],
    queryFn: async () => fetchConsultation(consultationId),
    enabled: !!consultationId,
  });

  const consultation = consultationData?.data ?? {};

  console.log("consultation", consultation);

  const patient = {
    name: "Jane Doe",
    address: "123 Greenway Avenue, Suite 456, Springfield, IL 62704, USA",
    condition: "Hypertension",
    genotype: "AA",
    bloodType: "O+",
    phoneNumber: "+23480899777700",
    dateOfBirth: "12/03/1889",
    gender: "Female",
    prescriptions: [
      "Amoxicillin 500mg",
      "Amoxicillin 500mg",
      "Amoxicillin 500mg",
    ],
    notes:
      "Dr. John Doe is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions. He combines advanced medical techniques with compassionate care to help patients manage and prevent cardiovascular diseases. A published researcher and community health advocate,",
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <PageHeader title="Profile" />
        <ActivityIndicator size="large" color="#0B8AA0" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <PageHeader title="Profile" />
        <Text style={styles.errorText}>
          Error loading profile: {error.message}
        </Text>
      </SafeAreaView>
    );
  }

  if (!consultation) {
    return (
      <SafeAreaView style={styles.container}>
        <PageHeader title="Profile" />
        <Text style={styles.errorText}>Consultation details not found.</Text>
      </SafeAreaView>
    );
  }

  const avatarUrl = getAvatarUrl(consultation.appointment.patient.full_name);
  const imageSource = consultation.appointment.patient.profile_image
    ? { uri: consultation.appointment.patient.profile_image }
    : { uri: avatarUrl };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Profile" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={imageSource} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.nameText}>
                {toTitleCase(consultation.appointment.patient.full_name)}
              </Text>
              <Text style={styles.addressText}>{patient.address}</Text>
              <View style={styles.conditionContainer}>
                <Text style={styles.conditionText}>
                  {toTitleCase(patient.condition)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Genotype</Text>
              <View style={styles.detailsValueContainer}>
                <Text style={styles.detailsValue}>{patient.genotype}</Text>
              </View>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Blood type</Text>
              <View style={styles.detailsValueContainer}>
                <Text style={styles.detailsValue}>{patient.bloodType}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Phone number</Text>
              <View style={styles.detailsValueContainer}>
                <Text style={styles.detailsValue}>{patient.phoneNumber}</Text>
              </View>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Date of birth</Text>
              <View style={styles.detailsValueContainer}>
                <Text style={styles.detailsValue}>{patient.dateOfBirth}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Gender</Text>
              <View style={styles.detailsValueContainer}>
                <Text style={styles.detailsValue}>{patient.gender}</Text>
              </View>
            </View>
            <View style={styles.detailsColumn}></View>
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionLabel}>Previous prescriptions</Text>
          <View style={styles.prescriptionsContainer}>
            {patient.prescriptions.map((prescription, index) => (
              <Text key={index} style={styles.prescriptionText}>
                {prescription}
              </Text>
            ))}
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionLabel}>Additional notes</Text>
          <View style={styles.notesContainer}>
            <Text style={styles.notesText}>{patient.notes}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
