import PageHeader from "../../components/ui/PageHeader";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  ListRenderItem,
  FlatList,
} from "react-native";
import AppLayout from "../../components/layouts/app.layout";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { Prescription, User } from "../../types";
import { useUserProfile } from "../../hooks/useUserProfile";
import PatientCard from "../../components/PatientCard";
import { usePrescription } from "../../hooks/usePrescription";
import PrescriptionCard from "../../components/PrescriptionCard";
import PageLoader from "../../components/ui/PageLoader";
import styles from "./styles";

const ITEMS_PER_PAGE = 15;

export default function PatientPrescription({ navigation, route }) {
  const { patientId } = route.params || {};

  const [patient, setPatient] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  const [loadingPatient, setLoadingPatient] = useState(false);
  const [patientError, setPatientError] = useState<string | null>(null);

  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
  const [refreshingPrescriptions, setRefreshingPrescriptions] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [prescriptionError, setPrescriptionError] = useState<string | null>(
    null
  );

  const { fetchUser } = useUserProfile();
  const { fetchPrescriptions } = usePrescription();

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

        loadPatientPrescriptions();
      } catch (error) {
        setError(error);
        console.error("Failed to fetch patient:", error);
      }
    };

    loadPatientData();
  }, [patientId, fetchUser]);

  const loadPatientPrescriptions = useCallback(
    async (isRefreshing = false) => {
      if (
        (loadingPrescriptions && !isRefreshing) ||
        loadingMore ||
        (!hasMore && !isRefreshing)
      ) {
        return;
      }

      const currentPage = isRefreshing ? 1 : page;

      if (isRefreshing) {
        setRefreshingPrescriptions(true);
        setPrescriptionError(null);
      } else if (currentPage > 1) {
        setLoadingMore(true);
      } else {
        setLoadingPrescriptions(true);
      }

      try {
        const res = await fetchPrescriptions({
          page,
          limit: ITEMS_PER_PAGE,
          patient: patientId,
        });
        setPrescriptions(res.data);
      } catch (error) {
        console.error("Error fetching prescriptions", error);
        setError("Failed to prescriptions, try again.");
      } finally {
        if (isRefreshing) {
          setRefreshing(false);
        } else if (currentPage > 1) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [page, loading, loadingMore, hasMore, fetchPrescriptions]
  );

  const handleRefresh = useCallback(() => {
    setPage(1);
    setHasMore(true);
    loadPatientPrescriptions(true);
  }, [loadPatientPrescriptions]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && !loading && !refreshing) {
      loadPatientPrescriptions();
    }
  }, [loadingMore, hasMore, loading, refreshing, loadPatientPrescriptions]);

  const renderPrescriptionItem: ListRenderItem<Prescription> = ({ item }) => (
    <View>
      <PrescriptionCard prescription={item} />
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View>
        <ActivityIndicator size="small" color="#0B8AA0" />
        <Text>Loading more prescriptions...</Text>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (loading) return null;

    return (
      <View>
        <Text>{error || "No patients found"}</Text>
      </View>
    );
  };

  const CreatePrescriptionButton = () => {
    const onPress = () => {
      if (patient) {
        navigation.navigate("CreatePrescription", {
          patientId: patient._id,
          patientName: patient.full_name,
        });
      } else {
        console.warn(
          "CreatePrescriptionButton: Patient data not available yet."
        );
      }
    };
    return (
      <Pressable onPress={onPress} disabled={!patient}>
        <Ionicons
          name="add-outline"
          size={24}
          color={patient ? "#0B8AA0" : "#cccccc"}
        />
      </Pressable>
    );
  };

  if (!patient) {
    return <PageLoader />;
  }

  return (
    <AppLayout>
      <PageHeader title="Patient Prescription" />

      <View style={styles.patientCardWrapper}>
        <PatientCard patient={patient} showPresciptionButton={false} />
      </View>

      {loading && page === 1 && !refreshing ? (
        <View>
          <ActivityIndicator size="large" color="#0B8AA0" />
          <Text>Loading prescriptions...</Text>
        </View>
      ) : (
        <FlatList
          data={prescriptions}
          keyExtractor={(item) =>
            // item._id?.toString() || Math.random().toString()
            Math.random().toString()
          }
          renderItem={renderPrescriptionItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#0B8AA0"]}
              tintColor="#0B8AA0"
            />
          }
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={15}
        />
      )}
    </AppLayout>
  );
}
