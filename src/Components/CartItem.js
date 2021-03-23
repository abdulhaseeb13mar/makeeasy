import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts, metrics} from '../utils/Theme';

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, image, price, bgcolor} = this.props.item;
    return (
      <View style={[styles.container,]}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Image
            style={[styles.image, {backgroundColor: bgcolor}]}
            source={image}
          />
          <View style={{flex: 1}}>
            <Text numberOfLines={2} style={styles.title}>
              {name}
            </Text>
            {/* <Text style={styles.price}>${price}</Text> */}
          </View>
        </View>
        <View style={styles.quantityView}>
          <Icon
            name="plus-box"
            style={styles.icon}
            onPress={this.props.onAdd}
          />
          <Text style={styles.quantity}>{this.props.quantity}</Text>
          <Icon
            name="minus-box"
            style={styles.icon}
            onPress={this.props.onMinus}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: metrics.defaultMargin,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor:'white',
    marginHorizontal: metrics.defaultMargin,
    marginTop:5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius:20,

    marginHorizontal: 20,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    color:'black',
    marginBottom: 5,
    fontWeight:'bold'
  },
  price: {
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    marginBottom: 5,
    color: colors.grey
  },
  quantityView: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 5,
  },
  quantity: {
    alignSelf: 'center',
    marginVertical: 5,
    fontFamily: fonts.primaryBold,
  },
  icon: {
    fontSize: 24,
    color: colors.primary,
  },
});
