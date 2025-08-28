import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import PageHeader from "../../components/ui/PageHeader";
import { fetchConsultations } from "../../api/services/consultation.service";
import ConsultationCard from "../../components/ConsultationCard";
import styles from "./styles";

const ITEMS_PER_PAGE = 15;

export default function Patients({ navigation }) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["consultations"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchConsultations(pageParam, ITEMS_PER_PAGE);
      return {
        patients: res.data.data,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage.patients.length === ITEMS_PER_PAGE;
      return morePagesExist ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const patients = data?.pages.flatMap((page) => page.patients) ?? [];

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderPatientItem: ListRenderItem<any> = ({ item }) => (
    <View style={styles.patientCardContainer}>
      <ConsultationCard
        consultation={item}
        onViewConsulation={() => {
          navigation.navigate("PatientProfile", {
            consultationId: item._id,
          });
        }}
      />
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0B8AA0" />
        <Text style={styles.loadingMoreText}>Loading more patients...</Text>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {isError ? `Error: ${error.message}` : "No patients found"}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Patients List" />

      {isLoading && !isRefetching ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0B8AA0" />
          <Text style={styles.loadingText}>Loading patients...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={patients}
          renderItem={renderPatientItem}
          keyExtractor={(item) =>
            item._id?.toString() || Math.random().toString()
          }
          contentContainerStyle={styles.listContentContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
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
    </SafeAreaView>
  );
}
