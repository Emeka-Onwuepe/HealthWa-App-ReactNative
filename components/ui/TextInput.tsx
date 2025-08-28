import { useState } from "react";
import {
  View,
  TextInput as Input,
  StyleSheet,
  TextInputProps,
  Text,
} from "react-native";
import { fontFamily } from "../../constants/typography";

interface Props extends TextInputProps {
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  value: string;
  label?: string;
  error?: string;
  labelStyle?: any;
  inputStyle?: any;
  containerStyle?: any;
}

export default function TextIput({
  onChangeText,
  isPassword = false,
  value,
  label,
  error,
  labelStyle,
  inputStyle,
  containerStyle,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Input
        style={[styles.input, inputStyle]}
        {...props}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isPassword && showPassword}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "#11B3CF",
    marginVertical: 10,
    borderRadius: 50,
    width: "100%",
    paddingHorizontal: 20,
    fontFamily: fontFamily.regular,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
    fontWeight: "400",
    fontFamily: fontFamily.regular,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: fontFamily.light,
  },
});
