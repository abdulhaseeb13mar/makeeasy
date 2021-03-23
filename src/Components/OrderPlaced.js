import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Navigator from '../utils/Navigator';
import {colors, fonts, metrics} from '../utils/Theme';

export default class OrderPlaced extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalView}>
          <View style={styles.centeredView}>
            <View style={styles.iconView}>
              <Icon name="check" color={colors.primary} size={54} />
            </View>
            <Text style={[styles.title,{fontWeight:'bold'}]}>
              Your order has been placed successfully!
            </Text>
            <Text style={{
              textAlign:'center',
              marginBottom:metrics.defaultMargin
            }}>We will reach out to you shortly with your order.</Text>
            <View style={{borderRadius: 3, overflow: 'hidden',marginVertical:10}}>
              <Text onPress={this.props.onPress} style={styles.button}>Ok</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },
  centeredView: {
    backgroundColor: 'white',
    width: metrics.width * 0.8,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
  },
  iconView: {
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
    borderColor:colors.primary,
    borderWidth:2
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.primaryBold,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 32,
  },
  button: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: 10,
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.secondaryBold,
    fontWeight:'bold'
  },
});
