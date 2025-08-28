import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

interface PageLoaderProps {
  message?: string;
  color?: string;
  size?: "small" | "large";
}

export default function PageLoader({
  message = "Loading...",
  color = "#0B8AA0",
  size = "large",
}: PageLoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />

      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  messageContainer: {
    marginTop: 20,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
