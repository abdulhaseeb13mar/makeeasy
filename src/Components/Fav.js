import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../utils/Theme';
import {addFav} from '../Redux/actions';
import {connect} from 'react-redux';

class Fav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      console.log(this.props.isFav)
    return (
      <TouchableOpacity
        onPress={() => this.props.addFav(this.props.item)}
        style={{
          backgroundColor: 'transparent',
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf:'flex-end',
          // marginHorizontal:20,
          position:'absolute',
          ...this.props.style,
        }}>
          {
            this.props.isFav?
            <Icon
              name={'heart'}
              style={{
                fontSize: 22,
                color: colors.primary,
              }}
            />
              :
              <Icon
              name={'heart-outline'}
              style={{
                fontSize: 22,
                color: colors.primary,
              }}
        />
          }
      </TouchableOpacity>
    );
  }
}

export default connect(null, {addFav})(Fav);
