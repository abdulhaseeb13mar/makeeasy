import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {HorizontalList, Wrapper} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import {
  SafeAreaView,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigator from '../utils/Navigator';
import data from '../../data';
import {connect} from 'react-redux';
import {addItem, deleteItem} from '../Redux/actions';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
  }

  addItem = () => {
    this.props.addItem(this.props.route.params.item);
  };

  deleteItem = () => {
    this.props.deleteItem(this.props.route.params.item);
  };
  capitalize=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getIngredients=(id)=>{
      let name= data.ingredients.find((cat)=>(
        cat.productid==id
      ))
      // console.log('category nameeee', name)
      return name.ingredientsname;
    }


  render() {
    const {
      name,
      image,
      description,
      price,
      bgcolor,
      id,
      type,
      isFav,
      Rating
    } = this.props.route.params.item;

    const flag = this.props.cart?.items.filter((val) => val.id == id);
    const quantity = flag.length !== 0 ? flag[0].quantity : 0;

    const ingredients=this.getIngredients(id)
    // console.log('ingredianes', ingredients, id)

    return (
      <Wrapper top={0} bottom={0} style={{backgroundColor: bgcolor}}>
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View>
          <View style={{flexDirection:'row',padding: metrics.defaultMargin, justifyContent:'space-between', alignItems:'center'}}>
              <TouchableWithoutFeedback onPress={() => Navigator.goBack()}>
                <View style={[styles.backIcon]}>
                  <Icon name="chevron-back" color={colors.primary} size={30} />
                </View>
              </TouchableWithoutFeedback>
              <View style={{flexDirection:'row', alignItems:'center', }}>
                <Text style={{fontSize:25, marginRight:5}}>{Rating}</Text>
                  <Icon
                    name={'star'}
                    style={{
                      fontSize: 30,
                      color: colors.primary,
                    }}
                  />

              </View>

            </View>
         <Text style={styles.nameHeading}>{name}</Text>
        <View style={styles.imageView}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={{paddingHorizontal: metrics.defaultMargin, marginTop:metrics.defaultMargin}}>

        <Text style={styles.smallHeading}>Ingredients:</Text>
          {ingredients.split('\n').map(steps=>{
            return(
              <View style={{flexDirection:'row'}} >
              <View style={{paddingTop:2, paddingRight:5}}>
                <Text style={{fontSize:9, color: colors.primary}} >{'\u2B24'}</Text>
              </View>
              <Text style={styles.text}>{this.capitalize(steps)}</Text>
              </View>
            );
          })}
         
          <Text style={styles.smallHeading}>Receipe:</Text>
          {description.split('\n').map(steps=>{
            return(
              <View style={{flexDirection:'row'}} >
              <View style={{paddingTop:2, paddingRight:5}}>
                <Text style={{fontSize:9, color: colors.primary}} >{'\u2B24'}</Text>
              </View>
              <Text style={styles.text}>{this.capitalize(steps)}</Text>
              </View>
            );
          })}
          
          
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }}>
          </View>
        </View>
            
              <View style={{flexDirection:'row', margin: metrics.defaultMargin, borderRadius:3}}>
                
                <TouchableWithoutFeedback
                onPress={() =>{
                  this.addItem()
                  Navigator.navigate('Checkout', {
                    item: this.props.route.params.item,
                  })
                }
                }>
                <View style={[styles.btn,{backgroundColor:colors.primary}]}>
                  <Text style={[styles.btnText,{color:'white'}]} > Add To Cook Book</Text>
                </View>
                </TouchableWithoutFeedback>
              </View>
                  
          </View>
            </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  heading: {
    fontFamily: fonts.secondaryBold,
    fontSize: 28,
    marginBottom: metrics.defaultMargin,
    color: colors.secondary,
  },
  nameHeading:{
    fontFamily: fonts.secondaryBold,
    fontSize: 28,
    marginLeft: metrics.defaultMargin,
    color: 'black',
    fontWeight:'bold',
    marginBottom:metrics.smallMargin,
    textAlign:'center'
  },
  smallHeading: {
    fontFamily: fonts.primaryBold,
    fontSize: 22,
    fontWeight:'bold',
    marginTop: metrics.defaultMargin,
    marginBottom:metrics.smallMargin
  },
  prodtype:{
    fontFamily: fonts.primary,
    fontSize: 18,
    lineHeight: 20,
    marginLeft: metrics.defaultMargin,
    color: colors.grey,
    fontWeight:'bold'
  },
  text: {
    fontFamily: fonts.primary,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: metrics.defaultMargin,
    color: colors.grey,
    textTransform:'capitalize'
  },
  imageView: {
    // marginTop: metrics.largeMargin,
    width: metrics.width,
    height: 300,
    // backgroundColor:'red'
    // justifyContent: 'flex-end',
  },
  buttonView: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    borderTopStartRadius: 30,
    paddingHorizontal: 30,
    marginLeft: metrics.defaultMargin,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: fonts.primaryBold,
  },
  backIcon: {
    color: colors.primary
  },

  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: metrics.defaultMargin,
  },
  iconView: {
    width: 30,
    height: 30,
    borderRadius: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    fontSize: 24,
    color: colors.primary,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  colorContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginBottom: metrics.defaultMargin
  },
  colorPatch: {
    width: 30,
    height: 30,
    borderRadius: 3,
    margin: metrics.smallMargin,
    marginLeft:0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btn:{
    flex:1,
    borderRadius:10,
    backgroundColor:'red',
    marginTop:metrics.defaultMargin,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    // margin:metrics.defaultMargin

  },
  btnText:{
    textAlign:'center',
    paddingVertical:metrics.smallMargin,
    fontFamily: fonts.secondaryBold,
    fontSize: 18,
    fontWeight:'bold',

  },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {addItem, deleteItem})(ProductDetail);
