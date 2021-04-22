import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Form, Item, Label, Input, Picker, Icon, Text, Button} from 'native-base';
import {addDrink} from '../state/Actions/addDrink';
import {getAllVenues} from '../state/Actions/getAllVenues';
import {daysOfWeek} from '../models/daysOfWeek';

const initialState = {
  Name: null,
  Price: null,
  Type: null,
  Category: null,
  Description: null,
  Address: null,
  Venue: null,
  Availability: null,
};
class AddDrink extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.getAllVenues();
  }

  handleAddDrink = () => {
    const {
      Name,
      Price,
      Type,
      Category,
      Description,
      Address,
      Venue,
      Availability,
    } = this.state;
    this.props.addDrink({
      Name,
      Price: Number(Price),
      Type,
      Category,
      Description,
      Address,
      Venue,
      Availability,
      VenueDrinks: this.getSelectedVenueDrinks(),
    });
    this.setState({
      Description: null,
      Name: null,
      Price: null,
      Category: null,
      Availability: null,
    });
  };

  getSelectedVenueDrinks = () => {
    let venueDrinks = [];
    this.props.venues.forEach((venue) => {
      if (venue.venueId === this.state.Venue.VenueId) {
        venueDrinks = venue.Drinks;
      }
    });
    return venueDrinks;
  };

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

  render() {
    console.tron.log('state', this.state);
    console.tron.log('props', this.props);
    return (
      <ScrollView>
        <Form style={{paddingBottom: 30}}>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              value={this.state.Name}
              onChangeText={(name) => this.setState({Name: name})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Price</Label>
            <Input
              value={this.state.Price}
              onChangeText={(price) => this.setState({Price: price})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Description</Label>
            <Input
              value={this.state.Description}
              onChangeText={(description) => this.setState({Description: description})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Input onChangeText={(address) => this.setState({Address: address})} />
          </Item>
        </Form>
        {daysOfWeek.map((day) => (
          <Item>
            <Label>{day + ': '}</Label>
            <Label style={styles.timeLabelText}>Start Time</Label>
            <Input
              value={this.state.Availability ? this.getCurrentTime(day, 0) : null}
              onChangeText={(startTime) => this.setStartTime(day, startTime)}
            />
            <Label style={styles.timeLabelText}>End Time</Label>
            <Input
              value={this.state.Availability ? this.getCurrentTime(day, 1) : null}
              onChangeText={(endTime) => this.setEndTime(day, endTime)}
            />
          </Item>
        ))}
        <Item picker style={{paddingTop: 20}}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Select the Venue"
            placeholderIconColor="#007aff"
            selectedValue={this.state.Venue}
            onValueChange={(Venue) => {
              this.setState({Venue});
            }}>
            {this.props.venues.map((venue) => {
              const val = {VenueName: venue.Name, VenueId: venue.venueId};
              return <Picker.Item label={venue.Name} value={val} />;
            })}
          </Picker>
        </Item>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Select the Type"
            placeholderIconColor="#007aff"
            selectedValue={this.state.Type}
            onValueChange={(type) => {
              this.setState({Type: type});
            }}>
            <Picker.Item label="Beer" value="Beer" />
            <Picker.Item label="Wine" value="Wine" />
            <Picker.Item label="Cocktail" value="Cocktail" />
            <Picker.Item label="Margarita" value="Margarita" />
            <Picker.Item label="Vodka" value="Vodka" />
          </Picker>
        </Item>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Drink Category"
            placeholderIconColor="#007aff"
            selectedValue={this.state.Category}
            onValueChange={(category) => this.setState({Category: category})}>
            <Picker.Item label="Top Deal" value="TopDeal" />
            <Picker.Item label="Specialty" value="Specialty" />
            <Picker.Item label="Local" value="Local" />
          </Picker>
        </Item>
        <Button full style={{marginTop: 30}} onPress={() => this.handleAddDrink()}>
          <Text>Add Drink</Text>
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  timeLabelText: {
    fontSize: 14,
    paddingRight: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    venues: state.venueInformation.venues,
  };
};

const mapDispatchToProps = {
  addDrink,
  getAllVenues,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDrink);
