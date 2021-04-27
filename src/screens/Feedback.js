import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  Form,
  Item,
  Picker,
  Icon,
  Text,
  Button,
  Textarea,
  Card,
  CardItem,
} from 'native-base';
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

  render() {
    const {Message, Rating, Type} = this.state;
    return (
      <ScrollView style={{margin: 10}}>
        <Card style={{paddingTop: 20}}>
          <Text style={styles.textStyle}>How is the app?</Text>
          <Text style={styles.textStyle}>Feel free to submit any feedback below.</Text>
          <AirbnbRating
            count={5}
            defaultRating={0}
            reviews={['Terrible', 'Ehhh', 'Okay', 'Good!', 'WOW']}
            onFinishRating={(rating) => this.setState({Rating: rating})}
            showRating
          />
          <CardItem picker style={{paddingTop: 40, justifyContent: 'center'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{width: undefined}}
              placeholder="Feedback Type"
              placeholderIconColor="#007aff"
              selectedValue={this.state.Type}
              onValueChange={(type) => {
                this.setState({Type: type});
              }}>
              <Picker.Item label="Suggest a drink" value="suggestDrink" />
              <Picker.Item label="Suggest a feature" value="suggestFeature" />
              <Picker.Item label="Report a bug" value="reportBug" />
              <Picker.Item label="General" value="feedbackGeneral" />
            </Picker>
          </CardItem>
          <Textarea
            rowSpan={3}
            bordered
            placeholder="Feedback"
            onChangeText={(message) => this.setState({Message: message})}
          />
        </Card>
        <View style={styles.submitButton}>
          <Button
            style={{flex: 1, alignSelf: 'center'}}
            onPress={() => this.props.getFeedbackUser({Message, Rating, Type})}>
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
    marginTop: 30,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.darkGrey,
    padding: 10,
  },
});

const mapDispatchToProps = {
  getFeedbackUser,
};

export default connect(null, mapDispatchToProps)(Feedback);
