import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Form, Item, Label, Input, Text, Button} from 'native-base';
import COLORS from '../assets/colors';
import {editDrink} from '../state/Actions/editDrink';
import {daysOfWeek} from '../models/daysOfWeek';

class EditDrink extends Component {
  constructor(props) {
    super(props);
    const {
      Name,
      Price,
      Description,
      Availability,
      docId,
    } = this.props.route.params.drink;
    this.state = {
      Name: Name,
      Price: Price,
      Description: Description,
      Availability: Availability,
      docId: docId,
    };
  }

  getCurrentTime = (day, startOrEnd) => {
    const {Availability} = this.state;
    let time = null;
    Availability.forEach((availableDay) => {
      if (availableDay.Day === day) {
        time = availableDay.Times[startOrEnd];
      }
    });
    return time ? time.toString() : time;
  };

  setEndTime = (day, time) => {
    if (this.state.Availability) {
      const {Availability} = this.state;
      if (Availability.some((availableDay) => availableDay.Day === day)) {
        const newAvailability = Availability.map((availableDay) => {
          if (availableDay.Day === day) {
            return {
              ...availableDay,
              Times: [availableDay.Times[0], Number(time)],
            };
          }
          return availableDay;
        });
        this.setState({Availability: newAvailability});
      } else {
        const newDay = {
          Day: day,
          Times: [null, Number(time)],
        };
        const newAvailability = [...Availability, newDay];
        this.setState({Availability: newAvailability});
      }
    } else {
      const availableObject = {
        Day: day,
        Times: [null, Number(time)],
      };
      const availabilityArray = [availableObject];
      this.setState({Availability: availabilityArray});
    }
  };

  setStartTime = (day, time) => {
    if (this.state.Availability) {
      const {Availability} = this.state;
      if (Availability.some((availableDay) => availableDay.Day === day)) {
        const newAvailability = Availability.map((availableDay) => {
          if (availableDay.Day === day) {
            return {
              ...availableDay,
              Times: [Number(time), availableDay.Times[1]],
            };
          }
          return availableDay;
        });
        this.setState({Availability: newAvailability});
      } else {
        const newDay = {
          Day: day,
          Times: [Number(time), null],
        };
        const newAvailability = [...Availability, newDay];
        this.setState({Availability: newAvailability});
      }
    } else {
      const availableObject = {
        Day: day,
        Times: [Number(time), null],
      };
      const availabilityArray = [availableObject];
      this.setState({Availability: availabilityArray});
    }
  };

  onSave = () => {
    const {Name, Price, Description, Availability, docId} = this.state;
    this.props.editDrink({
      Name: Name,
      Price: Price,
      Description: Description,
      Availability: Availability,
      docId: docId,
    });
  };

  render() {
    return (
      <View>
        <Form>
          <Item floatingLabel>
            <Label>Drink Name</Label>
            <Input
              value={this.state.Name}
              onChangeText={(name) => this.setState({Name: name})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Drink Price</Label>
            <Input
              value={this.state.Price.toString()}
              onChangeText={(price) => this.setState({Price: price})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Drink Description</Label>
            <Input
              value={this.state.Description}
              onChangeText={(description) =>
                this.setState({Description: description})
              }
            />
          </Item>
          {daysOfWeek.map((day) => (
            <Item>
              <Label>{day + ': '}</Label>
              <Label style={styles.timeLabelText}>Start Time</Label>
              <Input
                value={
                  this.state.Availability ? this.getCurrentTime(day, 0) : null
                }
                onChangeText={(startTime) => this.setStartTime(day, startTime)}
              />
              <Label style={styles.timeLabelText}>End Time</Label>
              <Input
                value={
                  this.state.Availability ? this.getCurrentTime(day, 1) : null
                }
                onChangeText={(endTime) => this.setEndTime(day, endTime)}
              />
            </Item>
          ))}
        </Form>
        <Button bordered style={styles.button} onPress={() => this.onSave()}>
          <Text style={{color: COLORS.orange}}>Save Changes</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: COLORS.orange,
  },
  timeLabelText: {
    fontSize: 14,
    paddingRight: 10,
  },
});

const mapDispatchToProps = {
  editDrink,
};

export default connect(null, mapDispatchToProps)(EditDrink);
