import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteQuery } from "@tanstack/react-query";

import PageHeader from "../../components/ui/PageHeader";
import AppointmentCard from "../../components/ui/AppointmentCard";
import useAuthStore from "../../store/auth";

import {
  APPOINTMENT_STATUS,
  Appointment as AppointmentType,
  AppointmentQuery,
} from "../../types";
import { fetchAppointments } from "../../api/services/appointment.service";
import { Ionicons } from "@expo/vector-icons";
import AppointmentStyles from "./styles";

const ITEMS_PER_PAGE = 15;

export default function Appointment({ navigation }) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );

  const { user } = useAuthStore();
  const isDoctor = user.role === "doctor";

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
    queryKey: ["appointments", activeTab, user._id],
    queryFn: async ({ pageParam = 1 }) => {
      const query: AppointmentQuery = {
        page: pageParam.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(isDoctor ? { doctor: user._id } : { patient: user._id }),
        status:
          activeTab === "upcoming"
            ? APPOINTMENT_STATUS.UPCOMING
            : APPOINTMENT_STATUS.COMPLETED,
      };

      const response = await fetchAppointments(query);
      return {
        appointments: response.data.data as AppointmentType[],
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage.appointments.length === ITEMS_PER_PAGE;
      return morePagesExist ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const appointments = data?.pages.flatMap((page) => page.appointments) ?? [];

  const handleTabChange = useCallback((tab: "upcoming" | "completed") => {
    setActiveTab(tab);
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={AppointmentStyles.footerContainer}>
        <ActivityIndicator size="small" color="#0B8AA0" />
        <Text style={AppointmentStyles.loadingMoreText}>Loading more appointments...</Text>
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmptyComponent = useCallback(() => {
    if (isLoading) return null;

    return (
      <View style={AppointmentStyles.emptyContainer}>
        <Text style={AppointmentStyles.emptyText}>
          {isError
            ? "Failed to load appointments. Please try again."
            : activeTab === "upcoming"
            ? "No upcoming appointments"
            : "No completed appointments"}
        </Text>
      </View>
    );
  }, [isLoading, isError, activeTab]);

  const renderAppointmentItem: ListRenderItem<AppointmentType> = useCallback(
    ({ item }) => (
      <AppointmentCard appointment={item} navigation={navigation} />
    ),
    [navigation]
  );

  const TabHeader = useCallback(() => {
    return (
      <View style={AppointmentStyles.tabContainer}>
        <Pressable
          onPress={() => handleTabChange("upcoming")}
          style={[
            AppointmentStyles.tabButton,
            activeTab === "upcoming" && AppointmentStyles.activeTabButton,
          ]}
        >
          <Text
            style={[
              AppointmentStyles.tabText,
              activeTab === "upcoming" && AppointmentStyles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleTabChange("completed")}
          style={[
            AppointmentStyles.tabButton,
            activeTab === "completed" && AppointmentStyles.activeTabButton,
          ]}
        >
          <Text
            style={[
              AppointmentStyles.tabText,
              activeTab === "completed" && AppointmentStyles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </Pressable>
      </View>
    );
  }, [activeTab, handleTabChange]);

  const keyExtractor = useCallback(
    (item: AppointmentType) => item._id?.toString() || Math.random().toString(),
    []
  );

  const AddAppointmentButton = () => {
    // if (isDoctor) return;
    return (
      <Pressable
        onPress={() => navigation.navigate("CreateAppointment")}
        style={{ padding: 0 }}
      >
        <Ionicons name="add-circle-outline" size={24} color="#0B8AA0" />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={AppointmentStyles.container} edges={["top"]}>
      <PageHeader title="Appointment" rightElement={<AddAppointmentButton />} />

      {isLoading && !isRefetching ? (
        <View style={AppointmentStyles.loaderContainer}>
          <ActivityIndicator size="large" color="#0B8AA0" />
          <Text style={AppointmentStyles.loadingText}>Loading appointments...</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={keyExtractor}
          refreshing={isRefetching}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={<TabHeader />}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={15}
          contentContainerStyle={AppointmentStyles.listContentContainer}
        />
      )}
    </SafeAreaView>
  );
}
