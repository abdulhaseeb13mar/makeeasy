import {Dimensions, Platform} from 'react-native';

export const colors = {
  primary: '#d4116f',
  primaryLight: 'rgba(212, 17, 124,0.5)',
  secondary: '#fbfbfd',
  background: '#fbfbfd',
  button: '#22c7b8',
  darkBackground: '#fbfbfd',
  lightBackground: '#fbfbfd',
  grey: '#a3a3a3',
  lightGrey: '#e6e1e3',
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const metrics = {
  width: width,
  height: height,
  defaultMargin: Dimensions.get('window').width * 0.05,
  smallMargin: width * 0.03,
  largeMargin: width * 0.08,
};

export const fonts = {
  primary: Platform.select({
    android: 'Arial',
    ios: 'Arial',
  }),
  primaryBold: Platform.select({
    android: 'Arial',
    ios: 'Arial',
  }),
  secondary: Platform.select({
    android: 'Arial',
    ios: 'Arial',
  }),
  secondaryBold: Platform.select({
    android: 'Arial',
    ios: 'Arial',
  }),
};
