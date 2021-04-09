import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {Header, Button, Segment, Text} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import requestUserPermission from '../services/Firebase/notifications';
import isLocationAvailable from '../services/isLocationAvailable';
import {getAllDrinks} from '../state/Actions/drinks';
import {removeLikedDrink} from '../state/Actions/LikedDrinks/removeLikedDrink';
import {addLikedDrink} from '../state/Actions/LikedDrinks/addLikedDrink';
import {setCurrentLocation} from '../state/Actions/location.js';
import DrinkCard from '../components/DrinkCard';
import {DrinkCardPlaceholder} from '../placeholders/DrinkCardPlaceholder';
import Filters from '../components/Filters/Filters';
import filter from '../utilities/filter';
import COLORS from '../assets/colors';

class TopDeals extends Component {
  constructor(props) {
    super(props);
    this.onHeartPress = this.onHeartPress.bind(this);
    this.filterDrinks = this.filterDrinks.bind(this);

    this.state = {
      drinks: [{}, {}, {}], //Empty objects for placeholders map
      dataInitialized: false,
      modalVisible: false,
      filterByType: null,
      filterByPrice: null,
      filterByDistance: null,
      selectedTab: 1,
    };
  }

  requestNotifs = async () => {
    await requestUserPermission();
  };

  watchPosition = async () => {
    const locationAvailable = await isLocationAvailable();
    if (locationAvailable) {
      this.watchID = Geolocation.watchPosition(
        (position) => {
          this.props.setCurrentLocation({currentLocation: position});
        },
        () => {
          Alert.alert(
            'Sorry we had trouble accessing your location right now.',
          );
        },
        {enableHighAccuracy: true},
      );
    }
  };

  componentDidMount() {
    this.props.getAllDrinks();
    this.requestNotifs();
    this.watchPosition();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allDrinks !== this.props.allDrinks) {
      this.updateDrinksState();
    }
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  updateDrinksState() {
    const {selectedTab} = this.state;
    const currentSelectedDrinks = this.getSelectedCategoryOfDrinks(selectedTab);
    this.setState({drinks: currentSelectedDrinks, dataInitialized: true});
    this.reApplyFilters(currentSelectedDrinks);
  }

  renderDrinkCards(drink) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('DetailView', {docId: drink.docId});
        }}
        style={{backgroundColor: COLORS.backgroundWhite}}>
        <DrinkCard drink={drink} onHeartPress={this.onHeartPress} />
      </TouchableOpacity>
    );
  }

  reApplyFilters(drinkCategory) {
    const {filterByType, filterByPrice, filterByDistance} = this.state;
    filterByType &&
      this.filterDrinks({type: 'Type', value: filterByType}, drinkCategory);
    filterByPrice &&
      this.filterDrinks({type: 'Price', value: filterByPrice}, drinkCategory);
    filterByDistance &&
      this.filterDrinks(
        {type: 'Distance', value: filterByDistance},
        drinkCategory,
      );
  }

  filterDrinks(filterObject, selectedCategory) {
    const {
      filterByPrice,
      filterByType,
      filterByRating,
      selectedTab,
    } = this.state;
    const selectedDrinkCategory = selectedCategory
      ? selectedCategory
      : this.getSelectedCategoryOfDrinks(selectedTab);
    let filteredDrinks = [];

    switch (filterObject.type) {
      case 'Type':
        filteredDrinks = filter(selectedDrinkCategory, {
          drinkType: filterObject.value,
          drinkPrice: filterByPrice,
          drinkRating: filterByRating,
        });
        this.setState({
          filterByType: filterObject.value,
          drinks: filteredDrinks,
        });
        break;
      case 'Price':
        filteredDrinks = filter(selectedDrinkCategory, {
          drinkType: filterByType,
          drinkPrice: filterObject.value,
          drinkRating: filterByRating,
        });
        this.setState({
          filterByPrice: filterObject.value,
          drinks: filteredDrinks,
        });
        break;
      case 'Distance':
        const {currentLocation} = this.props;
        filteredDrinks = filter(
          selectedDrinkCategory,
          {
            drinkType: filterByType,
            drinkPrice: filterByPrice,
            drinkDistance: filterObject.value,
          },
          currentLocation,
        );
        this.setState({
          filterByDistance: filterObject.value,
          drinks: filteredDrinks,
        });
        break;
      default:
        break;
    }
  }

  onHeartPress(drink, lottieRef) {
    const {docId} = drink;
    const liked = this.props.likedDrinks.includes(docId);
    if (liked) {
      this.props.removeLikedDrink({drinkId: docId});
      lottieRef.current.reset();
    } else {
      this.props.addLikedDrink({drinkId: docId});
      lottieRef.current.play(0, 50);
    }
  }

  getSelectedCategoryOfDrinks(selectedTab) {
    const {topDeals, specialtyDrinks, localDrinks} = this.props;
    return {
      0: specialtyDrinks,
      1: topDeals,
      2: localDrinks,
    }[selectedTab];
  }

  onSegmentButtonPress(tab) {
    const drinkCategory = this.getSelectedCategoryOfDrinks(tab);
    this.setState({selectedTab: tab, drinks: drinkCategory});
    this.reApplyFilters(drinkCategory);
  }

  segmentButton(buttonName, tab, first, last) {
    const selected = this.state.selectedTab === tab ? true : false;
    return (
      <Button
        style={[styles.segmentButton, selected && styles.activeSegmentButton]}
        onPress={() => this.onSegmentButtonPress(tab)}
        first={first}
        last={last}>
        <Text
          style={[
            styles.segmentButtonText,
            selected && styles.activeSegmentButtonText,
          ]}>
          {buttonName}
        </Text>
      </Button>
    );
  }

  render() {
    const {dataInitialized} = this.state;
    return (
      <View style={styles.container}>
        <Header
          hasSegment
          style={{
            backgroundColor: COLORS.orange,
            width: '100%',
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}>
          <Segment style={styles.segment}>
            {this.segmentButton('Specialty', 0, true, false)}
            {this.segmentButton('Top Deals', 1, false, false)}
            {this.segmentButton('Local Craft', 2, false, true)}
          </Segment>
        </Header>
        <ScrollView>
          <Filters filterDrinks={this.filterDrinks} />
          <View>
            <FlatList
              data={this.state.drinks}
              renderItem={({item}) =>
                dataInitialized ? (
                  this.renderDrinkCards(item)
                ) : (
                  <DrinkCardPlaceholder />
                )
              }
              keyExtractor={(item) => item.docId}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundWhite,
  },
  segment: {
    backgroundColor: COLORS.orange,
  },
  segmentButton: {
    borderColor: COLORS.white,
    borderWidth: 3,
  },
  segmentButtonText: {
    color: COLORS.white,
  },
  activeSegmentButtonText: {
    color: COLORS.orange,
  },
  activeSegmentButton: {
    backgroundColor: COLORS.white,
  },
});

const mapStateToProps = (state) => {
  return {
    isWaiting: state.drinks.isWaiting,
    topDeals: state.drinks.deals,
    specialtyDrinks: state.drinks.specialtyDrinks,
    localDrinks: state.drinks.localDrinks,
    likedDrinks: state.drinks.likedDrinks,
    allDrinks: state.drinks.allDrinks,
    currentLocation: state.location.currentLocation,
  };
};

const mapDispatchToProps = {
  getAllDrinks,
  removeLikedDrink,
  addLikedDrink,
  setCurrentLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopDeals);
