import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";

interface ButtonProps {
  children?: ReactNode;
  title?: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  title,
  onPress,
  type = "primary",
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {children ? (
        <View style={styles.childrenContainer}>{children}</View>
      ) : (
        <Text
          style={[
            styles.buttonText,
            type === "primary" ? styles.primaryText : styles.secondaryText,
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 47,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  childrenContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#11B3CF",
    borderColor: "#11B3CF",
  },
  secondaryButton: {
    backgroundColor: "white",
    borderColor: "#11B3CF",
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
    borderColor: "#CCCCCC",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "white",
  },
  secondaryText: {
    color: "#11B3CF",
  },
  disabledText: {
    color: "#888888",
  },
});

export default Button;
