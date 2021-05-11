import analytics from '@react-native-firebase/analytics';

export const sendAnalytic = async (props) => {
  const {eventName, payload} = props;
  try {
    await analytics().logEvent(eventName, payload);
  } catch (err) {
    //this is where we need bugsnag
  }
};
