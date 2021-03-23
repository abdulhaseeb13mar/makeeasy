import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../Components/Header';
import Button from '../Components/Button';
import RootView from '../Components/Wrapper';
import SearchBar from '../Components/SearchBar';
import CardComponent from '../Components/FoodCard';
import {colors, fonts, metrics, text} from '../utils/Theme';
import {connect} from 'react-redux';
import data from '../../data';
import {ItemCard} from '../Components';

function SearchScreen(props) {
  const [list, setlist] = useState(data.items);
  const [searchQueryText, setsearchQueryText] = useState('');

  useEffect(() => {
    var updated_list = props.products.filter((val) =>
      val.name.toLowerCase().includes(searchQueryText.toLowerCase()),
    );
    setlist(updated_list);
  }, [props, searchQueryText]);

  return (
    <RootView>
      <Header textStyle={{fontWeight:'bold'}} title={'Search'}></Header>
      <SearchBar onChangeText={(value) => setsearchQueryText(value)} />
      <View style={{margin: metrics.defaultMargin}}>
        <Text>
          <Text style={{fontFamily: fonts.primary, }}>Found </Text>
          <Text style={{fontWeight:'bold'}}>{list.length} Results</Text>
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={false}
       
        bounces={false}
        data={list}
        style={{padding: metrics.defaultMargin}}
        keyExtractor={() => Math.random().toString()}
        renderItem={({item}) => (
          <ItemCard
            item={item}
            style={{marginBottom: metrics.defaultMargin, width: metrics.width * 0.84, marginHorizontal: metrics.smallMargin}}
          />
        )}
      />
    </RootView>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(SearchScreen);
