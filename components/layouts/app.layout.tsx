import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppLayoutProps {
  children: React.ReactNode;
  edges?: ("top" | "right" | "bottom" | "left")[];
}

export default function AppLayout({
  children,
  edges = ["top", "right", "bottom", "left"],
}: AppLayoutProps) {
  return (
    <SafeAreaView style={styles.container} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "white",
  },
});
