import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {H3, H2, Icon} from 'native-base';
import LottieView from 'lottie-react-native';
import COLORS from '../assets/colors';
import {presentOpening} from '../assets/animations';
import {deviceHeight} from '../assets/styles/dimensions/deviceDimensions';
import {getUser} from '../state/Selectors/getUserState';

class RedeemedDrink extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
    const {user} = this.props;
    const {drink} = this.props.route.params;
    const name = user.displayName ? user.displayName : user.providerData[0].displayName;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-back-sharp" type="Ionicons" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <View style={styles.mainContentContainer}>
          <H3 style={styles.bigText}>Woo Hoo!!</H3>
          <H3 style={styles.descriptionText}>
            {name +
              ', You Have Recieved a $' +
              drink.Price +
              ' ' +
              drink.Name +
              ' at ' +
              drink.Venue}
          </H3>
          <LottieView
            source={presentOpening}
            loop={true}
            style={styles.animation}
            ref={(animation) => {
              this.animation = animation;
            }}
          />
          <H2 style={styles.instructionText}>Please Show This Screen To The BarTender To Redeem</H2>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.orange,
  },
  mainContentContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  backButton: {
    flex: 1,
    paddingTop: deviceHeight * 0.05,
    paddingLeft: 15,
  },
  backButtonIcon: {
    fontSize: 35,
  },
  bigText: {
    fontWeight: '500',
    fontSize: 25,
    color: COLORS.backgroundWhite,
  },
  descriptionText: {
    fontWeight: '300',
    fontSize: 22,
    textAlign: 'center',
    color: COLORS.backgroundWhite,
  },
  instructionText: {
    fontWeight: '200',
    fontSize: 18,
    paddingTop: 20,
    textAlign: 'center',
    color: COLORS.backgroundWhite,
  },
  animation: {
    width: 400,
    height: 400,
  },
});

export default connect(mapStateToProps, null)(RedeemedDrink);
