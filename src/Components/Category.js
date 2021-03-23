// import React, {Component} from 'react';
// import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import {
//   FoodCard,
//   FoodIcon,
//   HorizontalList,
//   ItemCard,
//   Wrapper,
// } from '../Components';
// import {colors, fonts, metrics} from '../utils/Theme';
// import data from '../../data';



// export default class Category extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   TabList = ({item,index,onPress,selected}) => {
//     return (
//       <View
//         style={{
//           borderColor: 'blue',
//           width: '100%',
//           backgroundColor:'red',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginVertical: metrics.height * 0.02,
//         }}>
//         <TouchableWithoutFeedback
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'flex-start',
//             marginTop: metrics.height * 0.03,
//             height: metrics.width * 0.1,
//             paddingHorizontal: metrics.width * 0.02,
//             transform: [{rotate: '-90deg'}],
//             paddingTop: metrics.width * 0.02,
//           }}
//           onPress={() => onPress}>
//           <Text
//             style={{
//               fontSize: 16,
//               fontWeight: '700',
//               color:
//                 selected
//                   ? colors.primary
//                   : colors.secondary,
//             }}>
//             {item.name}
//           </Text>
//           {selected ? (
//             <View
//               style={{
//                 width: 30,
//                 borderWidth: 1.8,
//                 borderRadius: 10,
//                 marginTop: 4,
//                 backgroundColor: colors.primary,
//               }}
//             />
//           ) : null}
//         </TouchableWithoutFeedback>
//       </View>
//     );
//   };

//   render() {
//       const {item,index,onPress,selected} = this.props;
//     return (
//         // this.TabList(this.props)
//         <TouchableWithoutFeedback
//           onPress={onPress}>
//           <View style={{}} >
//             <View style={[styles.category,{
//             shadowOpacity: selected ? 0.34: 0.20,
//             shadowRadius:  selected ? 6.27: 1.41,
            
//             elevation: selected?  10: 2,
//             }]}>
//               <Text
//                 style={[
//                   styles.categoryText,
//                   {
//                     fontWeight:
//                       selected ? 'bold': 'normal',
//                       fontFamily:selected ? fonts.primaryBold:fonts.primary
//                   },
//                 ]}>
//                 {item.name}
//               </Text>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       );
//   }
// }

// const styles = StyleSheet.create({
//     category: {
//       justifyContent:'center',
//       alignItems:'center',
//       backgroundColor:'white',
//       borderRadius:3,
//       marginVertical: metrics.smallMargin,
//       marginRight:2,
//       // paddingHorizontal:10,
//       marginLeft:metrics.smallMargin,
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 1,
//       },
//       shadowOpacity: 0.20,
//       shadowRadius: 1.41,
//       elevation: 2,
      
//     },
//     categoryText: {
//       fontFamily: fonts.primary,
//       fontSize: 14,
//       textAlign: 'center',
//       width:'100%',
//       padding:10,
//       textTransform: 'capitalize',
//       color:colors.grey
//     },
//     dot: {
//       width: 8,
//       height: 8,
//       borderRadius: 5,
//       marginTop:5
//     },
//   });
  

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableWithoutFeedback} from 'react-native';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  FoodCard,
  FoodIcon,
  HorizontalList,
  ItemCard,
  Wrapper,
} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import data from '../../data'

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {item,index,onPress,selected} = this.props;
    return (
        <TouchableWithoutFeedback
          onPress={() => onPress(item)}>
          <View style={[styles.category,
            {backgroundColor: 'transparent'}
          ]}>
            <View style={[styles.dot,{display:selected?'flex':'none'}]}></View>
            <Text
              style={[
                styles.categoryText,
                {
                  color:selected ? 'black': colors.grey,
                  fontFamily:selected ? fonts.primaryBold:fonts.primary,
                  fontWeight:selected? 'bold':'normal',
                },
              ]}>
              {item.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
  }
}

const styles = StyleSheet.create({
    category: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      // backgroundColor:colors.primary,
      borderRadius:20,
      paddingLeft:20,
      marginRight:metrics.smallMargin,

      
    },
    categoryText: {
      fontFamily: fonts.primary,
      fontSize: 14,
      textAlign: 'center',
      // width:'20%',
      paddingLeft:5,
      marginVertical:10,
      color:colors.secondary,
      textTransform: 'capitalize'
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 5,
      marginTop:2,
      backgroundColor:colors.primary,
    },
  });
  