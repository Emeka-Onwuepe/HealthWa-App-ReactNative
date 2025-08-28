import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fontFamily } from "../../constants/typography";

interface PageHeaderProps {
  title: string;
  showLeftButton?: boolean;
  onLeftButtonPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  iconSize?: number;
  rightElement?: React.ReactNode;
  leftIcon?: any;
}

const DEFAULT_ICON_SIZE = 24;
const PLACEHOLDER_WIDTH = DEFAULT_ICON_SIZE + 10;

export default function PageHeader({
  title,
  showLeftButton = true,
  onLeftButtonPress,
  style,
  titleStyle,
  iconColor = "#000",
  iconSize = DEFAULT_ICON_SIZE,
  rightElement,
  leftIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back",
}: PageHeaderProps) {
  const navigation = useNavigation();

  const handleLeftButtonPress = () => {
    if (onLeftButtonPress) {
      onLeftButtonPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.header, style]}>
      {/* Left Side */}
      <View style={styles.leftContainer}>
        {showLeftButton ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleLeftButtonPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={leftIcon} size={iconSize} color={iconColor} />
          </TouchableOpacity>
        ) : rightElement ? (
          <View style={styles.placeholder} />
        ) : null}
      </View>

      <View style={styles.titleContainer}>
        <Text
          style={[styles.headerTitle, titleStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>

      {/* Right Side */}
      <View style={styles.rightContainer}>
        {rightElement ? (
          rightElement
        ) : showLeftButton ? (
          <View style={styles.placeholder} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    height: 56,
    width: "100%",
    elevation: 5,
    //iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  leftContainer: {
    minWidth: PLACEHOLDER_WIDTH,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  rightContainer: {
    minWidth: PLACEHOLDER_WIDTH,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  backButton: {
    padding: 5,
  },
  placeholder: {
    width: PLACEHOLDER_WIDTH,
    height: DEFAULT_ICON_SIZE,
  },
  headerTitle: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
  },
});
