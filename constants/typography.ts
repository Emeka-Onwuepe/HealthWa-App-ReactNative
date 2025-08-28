import { TextStyle } from 'react-native';

const fontFamily = {
  light: 'MitrLight',
  regular: 'MitrRegular',
  medium: 'MitrMedium',
  semiBold: 'MitrSemiBold',
  bold: 'MitrBold',
};

const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
};

interface TypographyStyle extends TextStyle {
  fontFamily: string;
  fontSize: number;
}

const typography: Record<string, TypographyStyle> = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize['3xl'],
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize['2xl'],
  },
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xl,
  },
  subtitle1: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
  },
  subtitle2: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
  },
  body1: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
  },
  body2: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
  },
  button: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
  },
  caption: {
    fontFamily: fontFamily.light,
    fontSize: fontSize.xs,
  },
};

export { fontFamily, fontSize, typography };