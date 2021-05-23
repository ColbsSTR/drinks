import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Picker, Icon, Text, Button, Textarea, Card, CardItem} from 'native-base';
import {AirbnbRating} from 'react-native-elements';
import {getFeedbackUser} from '../state/Actions/feedback';
import COLORS from '../assets/colors';

const initialState = {
  Message: null,
  Rating: null,
  Type: null,
};

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onSubmitFeedbackPress = (Message, Rating, Type) => {
    if (!Rating) {
      Alert.alert('Please Provide a Rating.');
    } else {
      this.props.getFeedbackUser({Message, Rating, Type});
    }
  };

  render() {
    const {Message, Rating, Type} = this.state;
    return (
      <ScrollView style={{margin: 10}}>
        <Card style={{paddingTop: 20, paddingHorizontal: 10, paddingBottom: 10}}>
          <Text style={styles.textStyle}>How is the app?</Text>
          <Text style={styles.textStyle}>Feel free to submit any feedback below.</Text>
          <View style={styles.hr} />
          <AirbnbRating
            count={5}
            defaultRating={0}
            reviews={['Terrible', 'Ehhh', 'Okay', 'Good!', 'WOW']}
            onFinishRating={(rating) => this.setState({Rating: rating})}
            showRating
          />
          <CardItem picker style={{paddingTop: 10, justifyContent: 'center'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{width: undefined}}
              placeholder="Feedback Type"
              placeholderIconColor="#007aff"
              selectedValue={this.state.Type}
              onValueChange={(type) => {
                this.setState({Type: type});
              }}
            >
              <Picker.Item label="Suggest a drink" value="suggestDrink" />
              <Picker.Item label="Suggest a feature" value="suggestFeature" />
              <Picker.Item label="Report a bug" value="reportBug" />
              <Picker.Item label="General" value="feedbackGeneral" />
            </Picker>
          </CardItem>
          <Textarea
            rowSpan={3}
            placeholder="Let us know what you think...."
            style={styles.textArea}
            onChangeText={(message) => this.setState({Message: message})}
          />
        </Card>
        <View style={styles.submitButton}>
          <Button
            style={{flex: 1, alignSelf: 'center'}}
            onPress={() => this.onSubmitFeedbackPress(Message, Rating, Type)}
          >
            <Text>Submit Feedback</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    marginTop: 20,
    marginBottom: 30,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: COLORS.mediumGrey,
    padding: 7,
  },
  textArea: {
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
  },
  hr: {
    alignSelf: 'center',
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 300,
    paddingTop: 10,
  },
});

const mapDispatchToProps = {
  getFeedbackUser,
};

export default connect(null, mapDispatchToProps)(Feedback);
