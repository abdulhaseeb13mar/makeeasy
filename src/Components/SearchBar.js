import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { metrics, colors, text } from '../utils/Theme';

import Icon from 'react-native-vector-icons/AntDesign';
import Navigator from '../utils/Navigator';

const height = metrics.height * 0.05;

export default function SearchBar(props) {
  const {
    onPress = () => Navigator.navigate('Search'),
    disabled = false,
  } = props;
  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.iconView}>
        <Icon name="search1" size={24} color={colors.primary}></Icon>
      </View>
      {!disabled ? (
        <TextInput
          autoFocus={true}
          placeholder={'Search your favourite receipes'}
          placeholderTextColor={colors.grey}
          style={{ ...styles.textInput, color: colors.primary }}
          {...props}
        />
      ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              if (disabled && onPress) {
                onPress();
              }
            }}>
            <View style={{ ...styles.textInput, justifyContent: 'center' }}>
              {/* <View style={styles.iconView}>
                <Icon name="search1" size={24} color={colors.secondary}></Icon>
              </View> */}
              <Text style={{ color: colors.grey, fontSize: 16 }}>Search your favourite receipes</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: metrics.defaultMargin,
    marginVertical: metrics.smallMargin,
    shadowColor: colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,

  },

  iconView: {
    // backgroundColor:'white',
    // height: height + 10,
    // width: height + 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 30,
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 2,
  },
  textInput: {
    // backgroundColor: 'red',
    position: 'relative',
    top: 0,
    left: 0,
    flex: 7,
    height: height,
    fontSize: 16,
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingLeft: 50,
  },
});
