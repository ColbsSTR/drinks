import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Item, Label, Input, Picker, Icon, CheckBox, Body, Text, Button, ListItem } from 'native-base';
import { addDrink } from '../state/Actions/addDrink';

const initialState = {
  Name: null,
  Price: null,
  Type: null,
  Category: null,
  Description: null,
  Latitude: null,
  Longitude: null,
  StartingTime: null,
  EndingTime: null,
  VenueName: null,
  Days: null,
}
class AddDrink extends Component {
  constructor(props) {
    super(props);
    this.state = initialState; 
  }

  toggleDays = (day) => {
    const { Days } = this.state;
    let updatedDays;
    !Days ? updatedDays = [] : updatedDays = [...Days]; 
    if (Days !== null && Days.includes(day)) {
      const dayIndex = updatedDays.indexOf(day);
      updatedDays.splice(dayIndex, 1);
    } else {
      updatedDays.push(day);

    }
    this.setState({ Days: updatedDays });
  }

  handleAddDrink = () => {
    const { 
      Name, Price, Type, Category, Description, Latitude, Longitude, StartingTime, EndingTime, VenueName, Days
    } = this.state;
    this.props.addDrink({
      Name,
      Price: Number(Price),
      Type,
      Category,
      Description,
      Latitude: Number(Latitude),
      Longitude: Number(Longitude),
      StartingTime: Number(StartingTime),
      EndingTime: Number(EndingTime),
      VenueName,
      Days,
    });
    this.setState({ 
      Description: null,
      Name: null,
      Price: null,
      Category: null,
    });
  }

  render() {
    const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
      <ScrollView>
        <Form>
            <Item inlineLabel>
              <Label>Name</Label>
              <Input value={this.state.Name} onChangeText={(name) => this.setState({ Name: name}) } />
            </Item>
            <Item inlineLabel>
              <Label>Price</Label>
              <Input value={this.state.Price} onChangeText={(price) => this.setState({ Price: price}) }/>
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select the Type"
                placeholderIconColor="#007aff"
                selectedValue={this.state.Type}
                onValueChange={(type) => { this.setState({ Type: type }) }}
              >
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
                style={{ width: undefined }}
                placeholder="Drink Category"
                placeholderIconColor="#007aff"
                selectedValue={this.state.Category}
                onValueChange={(category) => this.setState({ Category: category }) }
              >
                <Picker.Item label="Top Deal" value="TopDeal" />
                <Picker.Item label="Specialty" value="Specialty" />
                <Picker.Item label="Local" value="Local" />
              </Picker>
            </Item>
            <Item>
              <Input value={this.state.Description} placeholder="Description" onChangeText={(description) => this.setState({ Description: description}) }/>
            </Item>
            <Item inlineLabel>
              <Label>Latitude</Label>
              <Input onChangeText={(latitude) => this.setState({ Latitude: latitude}) }/>
            </Item>
            <Item inlineLabel>
              <Label>Longitude</Label>
              <Input onChangeText={(longitude) => this.setState({ Longitude: longitude}) }/>
            </Item>
            <Item inlineLabel>
              <Label>Starting Time</Label>
              <Input onChangeText={(startingTime) => this.setState({ StartingTime: startingTime}) }/>
            </Item>
            <Item inlineLabel>
              <Label>Ending Time</Label>
              <Input onChangeText={(endingTime) => this.setState({ EndingTime: endingTime}) }/>
            </Item>
            <Item inlineLabel>
              <Label>Venue Name</Label>
              <Input onChangeText={(venueName) => this.setState({ VenueName: venueName}) }/>
            </Item>
            <Item inlineLabel style={{ marginTop: 30 }}>
              <Label>Select Available Days</Label>
              <Input disabled/>
            </Item>
          </Form>
          { _.map(daysOfTheWeek, day => (
            <ListItem key={day}>
              <CheckBox onPress={() => this.toggleDays(day) } checked={this.state.Days?.includes(day)}/>
                <Body>
                  <Text>{day}</Text>
                </Body>
            </ListItem>
          ))}
          <Button full style={{ marginTop: 30 }} onPress={() => this.handleAddDrink()}>
            <Text>Add Drink</Text>
          </Button>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = {
  addDrink,
};

export default connect(null, mapDispatchToProps)(AddDrink);