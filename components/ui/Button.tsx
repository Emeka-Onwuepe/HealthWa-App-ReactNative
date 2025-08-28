import { ActivityIndicator, StyleSheet, Pressable } from "react-native";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: any;
}

const Button = ({
  onPress,
  children,
  buttonStyle,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={!isDisabled ? onPress : undefined}
      style={[styles.container, buttonStyle]}
      disabled={isDisabled}
    >
      {loading ? <ActivityIndicator color="#FFFFF" /> : children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#11B3CF",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
