import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';
import {colors, fonts, metrics} from '../utils/Theme';
import Fav from './Fav';
import LinearGradient from 'react-native-linear-gradient';

export default class FoodCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, image, description, price,bgcolor,isFav} = this.props.item;
    console.log('fooditem', this.props.item.isFav)
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => Navigator.navigate('ProductDetail',{item:this.props.item,category:this.props.category})}>
        <View style={[styles.container]}>
        <LinearGradient
           colors={[colors.lightGrey, 'white' ]}
           locations={[0, 0.5]}
           start={{ x: 0, y: 0 }}
           end={{ x: 1, y: 1 }}
           style={styles.linearGrad}
          >
          <View style={{margin:metrics.defaultMargin}}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {name.substr(0,name.indexOf(' '))}{'\n'}{name.substr(name.indexOf(' ')+1)}
              </Text>
            <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
              {description}
            </Text>
            {/* <Text style={styles.price}>
              <Text style={{fontWeight:'bold'}} >${price.replace('$', '')} {' '}</Text>
              <Text style={{fontSize: 14}}>each</Text>
            </Text> */}
          </View>
          <View style={styles.imageView}>
            <Image source={image} style={styles.image} />
          </View>
          <Fav isFav={isFav} item={this.props.item}/>
          
          {/* <View style={styles.detailView}>
            <View style={styles.iconView}>
              <Icon name="plus" color={colors.primary} size={24} />
            </View>
          </View> */}
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 230,
    marginRight: metrics.defaultMargin,
    borderRadius:30,
    backgroundColor:colors.darkBackground
  },
  linearGrad:{
    borderRadius:30,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  imageView: {
    width: 200,
    height: 200,
    alignSelf:'center',
    backgroundColor:'transparent',
    borderRadius:30,
    // marginVertical:15,
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode:'cover'
  },
  detailView: {
    // // paddingLeft: 30,
    // // paddingBottom: 20,
    // // paddingRight: 10,
    // shadowColor: colors.grey,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // borderRadius: 15,
  },
  iconView: {
    backgroundColor: 'rgba(255,255,255,.4)',
    borderBottomEndRadius: 30,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  title: {
    fontSize: 18,
    fontWeight:'bold'  
  },
  desc: {
    color: colors.grey,
    marginVertical: 5,
    fontFamily: fonts.secondary,
  },
  price: {
    marginTop: 5,
    fontSize: 20,
    fontFamily: fonts.secondaryBold,
  },
});
