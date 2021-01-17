import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  View, 
  Dimensions, 
  Platform 
} from 'react-native';
import { Icon } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { getTopDeals } from '../state/Actions/topDeals';
import { removeLikedDrink } from '../state/Actions/LikedDrinks/removeLikedDrink';
import { addLikedDrink } from '../state/Actions/LikedDrinks/addLikedDrink';
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

const { height } = Dimensions.get('window');

class TopDeals extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  constructor(props) {
    super(props);
    this.onHeartPress = this.onHeartPress.bind(this);

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
        <DrinkCard drink={drink} onHeartPress={this.onHeartPress} />
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

  onHeartPress(drink, lottieRef) {
    const { docId } = drink;
    const liked = this.props.likedDrinks.includes(docId);
    if (liked) {
      this.props.removeLikedDrink({ drinkId: docId });
      lottieRef.current.reset();
    } else {
      this.props.addLikedDrink({ drinkId: docId });
      lottieRef.current.play(0,50);
    }
  };

  render() {
    const { dataInitialized } = this.state;

    return (
      <View style={styles.container}>
        <View style={[ styles.filterContainer, styles.card ]}>
          <Icon name='filter-outline' style={{ padding: 8}} />
          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
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
          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 6 }}>
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
          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
            <Icon name='navigate-outline' />
            <RNPickerSelect
              onValueChange={(distance) => this.filterDrinks({type: 'filterByDistance' , value: distance})}
              placeholder={ { label: 'Any Distance', value: null } }
              style={ Platform.OS === 'ios' ? { inputIOS: { paddingTop: 8 }}: { inputAndroid: { paddingTop: 40 }}}
              items={[
                { label: '< 5 miles', value: 5 },
                { label: '< 10 miles', value: 10 },
                { label: '< 20 miles', value: 20 },
              ]}
            />
          </View>
        </View>
        <View style={{ flex: 1 }} >
          <FlatList
            data={this.state.deals}
            renderItem={({item}) => dataInitialized ? this.renderDrinkCards(item) : <DrinkCardPlaceholder /> }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    shadowRadius: 3, 
    shadowOpacity: .3, 
    shadowOffset:{ width: 0, height: 3 },
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  filterContainer: {
    height: Platform.OS === 'ios' ? height * .06 : height * .08, 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: COLORS.backgroundWhite,
    marginBottom: 10,
  },
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
    likedDrinks: state.topDeals.likedDrinks,
  };
};

const mapDispatchToProps = {
  getTopDeals,
  removeLikedDrink,
  addLikedDrink,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopDeals);
