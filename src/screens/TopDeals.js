import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, TouchableOpacity, View, Platform, ScrollView } from 'react-native';
import { Card, Icon } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { getTopDeals } from '../state/Actions/topDeals';
import DrinkCard from '../components/DrinkCard';
import { DrinkCardPlaceholder } from '../placeholders/DrinkCardPlaceholder'
import filter from '../utilities/filter';
import COLORS from '../assets/colors';

const TabIcon = (props) => (
  <Icon
    name="home"
    type="font-awesome"
    size={35}
    color={props.focused ? 'grey' : 'darkgrey'}
  />
);

class TopDeals extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  constructor(props) {
    super(props);

    this.state = {
      deals: [{}, {}, {}], //Empty objects for placeholders map
      dataInitialized: false,
      modalVisible: false,
      filterByType: null,
      filterByPrice: null,
      filterByDistance: null,
    };
  }

  componentDidMount() {
    this.props.getTopDeals();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topDeals.length === 0 && this.props.topDeals.length > 0) {
      this.setState({ deals: this.props.topDeals, dataInitialized: true });
    }
  }

  renderDrinkCards(drink) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('DetailView', {drink});
        }}>
        <DrinkCard drink={drink} />
      </TouchableOpacity>
    );
  };

  filterDrinks(filterObject) {
    const { filterByPrice, filterByType, filterByRating } = this.state;
    let filteredDrinks = [];

    switch(filterObject.type) {
      case 'filterByType':
        filteredDrinks = filter(this.props.topDeals, {drinkType: filterObject.value, drinkPrice: filterByPrice, drinkRating: filterByRating});
        this.setState({
          filterByType: filterObject.value,
          deals: filteredDrinks
        });
        break;
      case 'filterByPrice':
        filteredDrinks = filter(this.props.topDeals, {drinkType: filterByType, drinkPrice: filterObject.value, drinkRating: filterByRating});
        this.setState({
          filterByPrice: filterObject.value,
          deals: filteredDrinks
        });
        break;
      case 'filterByDistance':
        filteredDrinks = filter(this.props.topDeals, {drinkType: filterByType, drinkPrice: filterByPrice, drinkDistance: filterObject.value});
        this.setState({
          filterByDistance: filterObject.value,
          deals: filteredDrinks
        });
        break;
      default:
        break;
    }
  };

  DropDownIcon = () => (
    <Icon
      name="arrow-down"
      type="font-awesome"
      size={15}
    />
  );

  render() {
    const { dataInitialized } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <ScrollView
            horizontal={true}
            decelerationRate="fast"
          >
            <Card style={{ flex: 1, flexDirection: 'row' }}>
              <Icon name='filter-outline' style={{ padding: 8}} />
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name='beer'/>
                <RNPickerSelect
                  onValueChange={(type) => this.filterDrinks({type: 'filterByType' , value: type})}
                  placeholder={ { label: 'All Types', value: null } }
                  style={ Platform.OS === 'ios' ? { inputIOS: { paddingTop: 8, paddingHorizontal: 5 }}: {}}
                  items={[
                    { label: 'Beer', value: 'Beer' },
                    { label: 'Cocktail', value: 'Cocktail' },
                    { label: 'Wine', value: 'Wine' },
                  ]}
                />
              </View>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name='cash-outline' />
                <RNPickerSelect
                  onValueChange={(price) => this.filterDrinks({type: 'filterByPrice' , value: price})}
                  placeholder={ { label: 'All Prices', value: null } }
                  style={ Platform.OS === 'ios' ? { inputIOS: { paddingTop: 8, paddingHorizontal: 5 }}: {}}
                  items={[
                    { label: '$1', value: 1 },
                    { label: '$3 or less', value: 3 },
                    { label: '$5 or less', value: 5 },
                  ]}
                />
              </View>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name='navigate-outline' />
                <RNPickerSelect
                  onValueChange={(distance) => this.filterDrinks({type: 'filterByDistance' , value: distance})}
                  placeholder={ { label: 'Any Distance', value: null } }
                  style={ Platform.OS === 'ios' ? { inputIOS: { paddingTop: 8 }}: {}}
                  items={[
                    { label: '< 5 miles', value: 5 },
                    { label: '< 10 miles', value: 10 },
                    { label: '< 20 miles', value: 20 },
                  ]}
                />
              </View>
            </Card>
          </ScrollView>
        </View>
        <FlatList
          data={this.state.deals}
          renderItem={({item}) => dataInitialized ? this.renderDrinkCards(item) : <DrinkCardPlaceholder /> }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundWhite,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: COLORS.black,
    paddingRight: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    isWaiting: state.topDeals.isWaiting,
    topDeals: state.topDeals.deals,
  };
};

const mapDispatchToProps = {
  getTopDeals,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopDeals);
