import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {H2, H3} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {deviceHeight} from '../assets/styles/dimensions/deviceDimensions';
import COLORS from '../assets/colors';
import TopBarNavigation from '../navigation/TopBarNavigation';
import LikedDrinks from '../screens/LikedDrinks';
import Feedback from './Feedback';

const tabs = [
  {name: 'likedDrinks', component: LikedDrinks, title: 'Liked Drinks'},
  {name: 'feedback', component: Feedback, title: 'Send Feedback'},
];
const ProfileTabs = () => TopBarNavigation({tabs});

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {photoURL, displayName, TotalCheckInCount} = this.props.user;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[COLORS.orange, COLORS.lightOrange]}
          style={{flex: 4, paddingBottom: 20}}
        >
          <TouchableOpacity
            style={styles.gearIcon}
            onPress={() => this.props.navigation.navigate('Settings')}
          >
            <Icon
              name="cog"
              type="font-awesome-5"
              size={25}
              color="lightgray"
              style={{paddingRight: 12}}
            />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: photoURL
                  ? photoURL
                  : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            <View style={styles.nameContainer}>
              <H2 style={{fontWeight: '400', color: COLORS.backgroundWhite}}>{displayName}</H2>
              <H3 style={{fontWeight: '200', color: COLORS.backgroundWhite}}>
                {TotalCheckInCount ? TotalCheckInCount + ' Check-Ins' : 0 + ' Check-Ins'}
              </H3>
            </View>
          </View>
        </LinearGradient>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 10}}
        >
          <ProfileTabs />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    paddingTop: deviceHeight * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  nameContainer: {
    marginVertical: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  gearIcon: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    alignItems: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    drinks: state.drinks.allDrinks,
    likedDrinks: state.drinks.likedDrinks,
    removing: state.likedDrinks.removeLikedDrink.isWaiting,
  };
};

export default connect(mapStateToProps)(Profile);
