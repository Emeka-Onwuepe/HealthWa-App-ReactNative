import {
  View,
  Text,
  ActivityIndicator,
  // TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppLayout from "../../components/layouts/app.layout";
import PageHeader from "../../components/ui/PageHeader";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useEffect, useState } from "react";
import { User } from "../../types";
import PatientCard from "../../components/PatientCard";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DrugCard from "../../components/DrugCard";
import TextInput from "../../components/ui/TextInput";

import styles from "./styles";
import Button from "../../components/ui/Button";
import { usePrescription } from "../../hooks/usePrescription";

const createPrescriptionSchema = z.object({
  drug: z.string().nonempty(),
  prescription: z.string().nonempty(),
});

export type CreatePrescriptionFormData = z.infer<
  typeof createPrescriptionSchema
>;

export default function CreatePrescription({ route, navigation }) {
  const { patientId, patientName } = route.params;

  const [patient, setPatient] = useState<User>(null);
  const [drugs, selectDrugs] = useState<
    { drug: string; prescription: string }[]
  >([]);

  const { loading, setError, fetchUser } = useUserProfile();
  const { createPrescription } = usePrescription();

  useEffect(() => {
    const loadPatientData = async () => {
      if (!patientId) {
        setError("Patient ID not provided.");
        return;
      }

      if (patient) {
        return;
      }

      try {
        const response = await fetchUser(patientId);
        setPatient(response.data);
      } catch (error) {
        console.error("Failed to fetch patient:", error);
      }
    };

    loadPatientData();

    () => {
      setPatient(null);
    };
  }, [patientId, fetchUser]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePrescriptionFormData>({
    resolver: zodResolver(createPrescriptionSchema),
    defaultValues: {
      drug: "",
      prescription: "",
    },
  });

  if (loading && !patient) {
    // Show loader only when initially loading
    return (
      <AppLayout>
        <PageHeader title="New Prescription" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0B8AA0" />
          <Text>Loading patient details...</Text>
        </View>
      </AppLayout>
    );
  }

  if (!patient) {
    // Handle case where loading finished but patient is null
    return (
      <AppLayout>
        <PageHeader title="New Prescription" />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text>Patient not found or could not be loaded.</Text>
        </View>
      </AppLayout>
    );
  }

  const addDrug = (data: CreatePrescriptionFormData) => {
    selectDrugs((prevDrugs) => [
      ...prevDrugs,
      { drug: data.drug, prescription: data.prescription },
    ]);
    reset();
  };

  const deleteDrug = (index: number) => {
    const updatedDrugs = drugs.filter((_, i) => i !== index);
    selectDrugs(updatedDrugs);
  };

  const handlePrescription = async () => {
    try {
      const res = await createPrescription({
        patient: patient._id,
        prescriptions: drugs.map((drug) => ({
          drug: drug.drug,
          prescription: drug.prescription,
        })),
      });

      console.log(res);
      navigation.goBack();
    } catch (error) {
      console.error("Error creating prescription:", JSON.stringify(error));
    }
  };

  return (
    <AppLayout>
      <PageHeader title="New Prescription" />

      <ScrollView>
        <View>
          <Text style={styles.header}>Prescription for</Text>
          <PatientCard patient={patient} showPresciptionButton={false} />
        </View>

        <View>
          <View>
            <Controller
              control={control}
              name="drug"
              render={({ field }) => (
                <TextInput
                  label=" Select drug to prescribe"
                  placeholder="Drug Name"
                  value={field.value}
                  onChangeText={field.onChange}
                  labelStyle={styles.inputLabel}
                  error={errors.drug?.message}
                />
              )}
            />
          </View>
          <View>
            <Controller
              control={control}
              name="prescription"
              render={({ field }) => (
                <TextInput
                  label="Prescription"
                  placeholder="Prescription"
                  value={field.value}
                  onChangeText={field.onChange}
                  labelStyle={styles.inputLabel}
                  error={errors.prescription?.message}
                  multiline
                  numberOfLines={4}
                />
              )}
            />
          </View>

          <Button
            onPress={handleSubmit(addDrug)}
            buttonStyle={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add Drug</Text>
          </Button>
        </View>

        <View style={styles.drugContainer}>
          <View>
            <Text style={styles.selectedDrugText}>
              Selected Drugs ({drugs.length})
            </Text>
          </View>
          <View>
            {drugs.map((drug, index) => (
              <DrugCard
                drug={drug.drug}
                prescription={drug.prescription}
                key={index}
                onDelete={() => deleteDrug(index)}
              />
            ))}
          </View>
          <Button onPress={handlePrescription} buttonStyle={styles.addButton}>
            <Text style={styles.addButtonText}>PRESCRIBE</Text>
          </Button>
        </View>
      </ScrollView>
    </AppLayout>
  );
}
