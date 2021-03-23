import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {CartItem, FoodCard, Header, Input, ItemCard, Wrapper} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';

import Validation from '../utils/Validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from '../utils/Toast';
import OrderPlaced from '../Components/OrderPlaced';
import {BarIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';
import {addItem, deleteItem, emptyCart} from '../Redux/actions';
import Cart from '../../assets/images/cart.png';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      visible: false,
      loading: false,
      shadow:'black',
      fname:{
        borderColor:'rgba(163,163,163,0.4)',
      },
      lname:{
        borderColor:'rgba(163,163,163,0.4)',
      },
      email:{
        borderColor:'rgba(163,163,163,0.4)',
      },
      phoneNumber:{
        borderColor:'rgba(163,163,163,0.4)',
      },
      address:{
        borderColor:'rgba(163,163,163,0.4)',
      }
    };
    this.inputs = {};
  }

  onChange(name, val) {
    // console.log({[name]: val});
    this.setState({[name]: {...this.state[name], value:val}});
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  async apiCall() {
    this.setState({loading: true});
    const res = await fetch('https://reactnativeapps.herokuapp.com/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.fname,
        lastname: this.state.lname,
        phonenumber: this.state.phoneNumber,
        address: this.state.phoneNumber,
        slotdatetime: new Date().toString(),
        email: this.state.email,
        appname: 'Get Thrive',
        item: JSON.stringify(this.props.route.params.item),
      }),
    });

    const response = await res.json();
    this.setState({loading: false});
    if (response.status) this.setState({visible: true});
    else Toast('Some error occurred');
  }

  onButtonPress() {
    if (!Validation.isValidField(this.state.fname.value || '')) {
      return Toast('Please Enter Your First Name');
    }
    if (!Validation.isValidField(this.state.lname.value || '')) {
      return Toast('Please Enter Your Last Name');
    }
    if (!Validation.isValidField(this.state.email.value || '')) {
      return Toast('Please Enter Email');
    }
    if (!Validation.isEmailValid(this.state.email.value || '')) {
      return Toast('Please Enter Valid Email');
    }
    if (!Validation.isValidField(this.state.address.value || '')) {
      return Toast('Please Enter Address');
    }
    if (!Validation.isValidField(this.state.phoneNumber.value || '')) {
      return Toast('Please Enter Valid Phone Number');
    }

    this.apiCall();
  }

  onFocus(field) {
    this.setState({
      [field]: {...this.state[field], borderColor: 'rgba(34, 199, 184, .7)' }
})
}

onBlur(field) {

this.setState({
  [field]: {...this.state[field], borderColor: 'rgba(163,163,163,0.4)' }
})
}

  render() {
    return (
      <Wrapper bottom={0}>
        <Header textStyle={{fontWeight:'bold'}} title="Cook Book" />

        <OrderPlaced
          visible={this.state.visible}
          // visible={true}
          onPress={() => {
            this.setState({visible: false});
            this.props.emptyCart();
            Navigator.navigateAndReset('Home');
          }}
        />

        {this.props.cart.items.length > 0 ? (
          <>
            <KeyboardAwareScrollView
              bounces={false}
              style={{
                flex: 1,
                // backgroundColor:'red'
              }}>
              {this.props.cart.items.map((item) => (
                <ItemCard
                  noFav={true}
                  item={item}
                  quantity={item.quantity}
                  onAdd={() => this.props.addItem(item)}
                  onMinus={() => this.props.deleteItem(item)}
                  style={{marginHorizontal: metrics.defaultMargin, width: metrics.width * 0.90, marginBottom: metrics.defaultMargin}}
                />
              ))}
              
              
            </KeyboardAwareScrollView>
            <View style={{flexDirection:'row', margin: metrics.defaultMargin, borderRadius:3}}>
                        
                <TouchableWithoutFeedback
                 onPress={() =>
                  Navigator.navigate('Home')
                }>
                <View style={[styles.btn,{backgroundColor:colors.primary}]}>
                  <Text style={[styles.btnText,{color:'white'}]} >Add More!</Text>
                </View>
                </TouchableWithoutFeedback>
                
              </View>
            {/* <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.onButtonPress();
                  }}>
                  <View
                    style={[
                      styles.buttonView,
                      {paddingBottom: insets.bottom ? insets.bottom : 15},
                    ]}>
                    {this.state.loading ? (
                      <BarIndicator color="white" size={24} />
                    ) : (
                      <>
                        <Text style={styles.buttonText}>
                          Total Price: $ {this.props.cart.totalPrice}
                        </Text>
                        <Text style={styles.buttonText}>Place Order</Text>
                      </>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              )}
            </SafeAreaInsetsContext.Consumer> */}
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Cart} />
          </View>
        )}
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.primaryBold,
    fontSize: 28,
    marginVertical: metrics.defaultMargin,
    textAlign:'center'
  },
  buttonView: {
    backgroundColor: 'red',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    borderTopStartRadius: 30,
    paddingHorizontal: 30,
    marginLeft: metrics.defaultMargin,
    minHeight: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.primaryBold,
  },
  iconView: {
    backgroundColor: 'rgb(255,255,255)',
    width: 50,
    marginRight: '5%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 28,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: metrics.defaultMargin
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    fontWeight:'bold'
  },
  text: {
    fontFamily: fonts.secondary,
    fontSize: 16,
    color:colors.grey
  },
  btn:{
    flex:1,
    borderRadius:10,
    backgroundColor:'red',
    marginTop:metrics.defaultMargin,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    paddingVertical:metrics.smallMargin,

  },
  btnText:{
    textAlign:'center',
    fontWeight:'bold',
    fontFamily: fonts.secondaryBold,
    fontSize: 18,
  },
  infoContainer:{
    backgroundColor:'white',
    margin: metrics.defaultMargin,
    borderRadius:10,
    shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
    },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {addItem, deleteItem, emptyCart})(
  Checkout,
);
