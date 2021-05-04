import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {H3, H2} from 'native-base';
import LottieView from 'lottie-react-native';
import COLORS from '../assets/colors';
import {presentOpening} from '../assets/animations';
import {deviceHeight} from '../assets/styles/dimensions/deviceDimensions';

class RedeemedDrink extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <H3 style={{fontWeight: '500', fontSize: 25, color: COLORS.backgroundWhite}}>
          Woo Hoo!!
        </H3>
        <H3 style={{fontWeight: '300', fontSize: 22, textAlign: 'center', color: COLORS.backgroundWhite}}>
          Colby Crowne, You have recieved a $3 Rainbow shot at Bugsy's
        </H3>
        <H2 style={{fontWeight: '200', fontSize: 18, paddingTop: 20, textAlign: 'center', color: COLORS.backgroundWhite}}>
          Please Show This Screen To The BarTender To Redeem
        </H2>
        <LottieView
          source={presentOpening}
          loop={true}
          style={{width: 400, height: 400}}
          ref={(animation) => {
            this.animation = animation;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: deviceHeight * 0.1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.orange,
  },
});

export default RedeemedDrink;
