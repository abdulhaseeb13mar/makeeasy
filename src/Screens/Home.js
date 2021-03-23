import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  FoodCard,
  FoodIcon,
  HorizontalList,
  ItemCard,
  SearchBar,
  Wrapper,
} from '../Components';
import { colors, fonts, metrics } from '../utils/Theme';
import data from '../../data';
import Category from '../Components/Category';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '1',
      categories: [],
      items: [],
      recommended: [],
    };
  }

  componentDidMount() {
    const items = this.props.products.filter(
      (val) => val.categoryid == this.state.selectedCategory,
    );
    const recommended = this.props.products.filter((val) => val.recommended);
    this.setState({
      items: items,
      recommended: recommended,
    });
  }

  selectCategory = (item) => {
    this.setState({ selectedCategory: item.id });
    const items = this.props.products.filter(
      (val) => val.categoryid == item.id,
    );
    this.setState({ items: items });
  };

  UNSAFE_componentWillReceiveProps(props) {
    const items = props.products.filter(
      (val) => val.categoryid == this.state.selectedCategory,
    );
    const recommended = props.products.filter((val) => val.recommended);
    this.setState({
      items: items,
      recommended: recommended,
    });
  }

  render() {
    return (
      <Wrapper>
        <ScrollView
          style={{ flex: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
             Make Easy
            </Text>
            <Icon
              onPress={() => Navigator.navigate('Checkout')}
              name="book"
              style={styles.icon}
            />
          </View>
          <SearchBar disabled containerStyle={{marginBottom:0}} />

          <View style={{ marginTop: 10 }}>
            <HorizontalList
            style={{paddingLeft:metrics.smallMargin}}
              data={data.category}
              renderItem={({ item,index }) => (
                <Category
                  item={item}
                  index={index}
                  selected={item.id == this.state.selectedCategory}
                  onPress={() => this.selectCategory(item)}
                />
              )}
            />
          </View>

          <HorizontalList
           style={{paddingTop:5}}
           
            data={this.state.items}
            renderItem={({ item }) => (
              <FoodCard item={item} />
            )}
          />


        <Text style={styles.subHeading}>Popular</Text>
          <HorizontalList
            data={this.state.recommended}
            renderItem={({ item }) => <ItemCard item={item} />}
          />
          {this.props.favProducts.length > 0 && (
            <>
              <Text style={styles.subHeading}>Favourites</Text>
              <HorizontalList
                data={this.props.favProducts}
                renderItem={({ item }) => <ItemCard item={item} />}
              />
            </>
          )}
        </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    margin: metrics.defaultMargin,
    // marginTop:metrics.defaultMargin,
    // borderColor:'red',
    // borderWidth:1
  },
  heading: {
    // borderColor:'red',
    // borderWidth:1,
    fontFamily: fonts.primaryBold,
    fontWeight:'bold',
    fontSize: 26,
    // margin: metrics.defaultMargin,
    // marginRight: metrics.width * 0.35,
  },
  subHeading: {
    fontFamily: fonts.primaryBold,
    fontSize: 24,
    margin: metrics.defaultMargin,
    fontWeight:'bold'

  },
  category: {
    transform: [{ rotate: '270deg' }],
    marginVertical: 15,
    marginLeft: metrics.smallMargin,
    textAlign: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: fonts.primary,
    fontSize: 16,
    marginBottom: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    position: 'relative',
    // right: metrics.defaultMargin,
    // top: metrics.defaultMargin,
    fontSize: 32,
    color: colors.primary,
  },
});

const mapStateToProps = (state) => {
  return {
    products: state.products,
    favProducts: state.favProducts,
  };
};

export default connect(mapStateToProps)(Home);
