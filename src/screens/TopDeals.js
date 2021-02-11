import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  View, 
  Dimensions, 
  ScrollView,
} from 'react-native';
import { Header, Button, Icon, Segment, Text } from 'native-base';
import { getTopDeals } from '../state/Actions/topDeals';
import { removeLikedDrink } from '../state/Actions/LikedDrinks/removeLikedDrink';
import { addLikedDrink } from '../state/Actions/LikedDrinks/addLikedDrink';
import DrinkCard from '../components/DrinkCard';
import { DrinkCardPlaceholder } from '../placeholders/DrinkCardPlaceholder'
import filter from '../utilities/filter';
import COLORS from '../assets/colors';
import Filters from '../components/Filters/Filters';

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
    this.filterDrinks = this.filterDrinks.bind(this);

    this.state = {
      deals: [{}, {}, {}], //Empty objects for placeholders map
      dataInitialized: false,
      modalVisible: false,
      filterByType: null,
      filterByPrice: null,
      filterByDistance: null,
      selectedTab: 1,
    };
  }

  componentDidMount() {
    this.props.getTopDeals();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topDeals !== this.props.topDeals) {
      this.setState({ deals: this.props.topDeals, dataInitialized: true });
    }
    if (prevProps.likedDrinks !== this.props.likedDrinks) {
      this.setState({ deals: this.props.topDeals})
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
      case 'Type':
        filteredDrinks = filter(this.props.topDeals, {drinkType: filterObject.value, drinkPrice: filterByPrice, drinkRating: filterByRating});
        this.setState({
          filterByType: filterObject.value,
          deals: filteredDrinks
        });
        break;
      case 'Price':
        filteredDrinks = filter(this.props.topDeals, {drinkType: filterByType, drinkPrice: filterObject.value, drinkRating: filterByRating});
        this.setState({
          filterByPrice: filterObject.value,
          deals: filteredDrinks
        });
        break;
      case 'Distance':
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
  
  onSegmentButtonPress(tab) {
    this.setState({ selectedTab: tab });
  }

  segmentButton(buttonName, tab, first, last) {
    const selected = this.state.selectedTab === tab ? true : false;
    return (
      <Button 
        style={[styles.segmentButton, selected && styles.activeSegmentButton]}
        onPress={() => this.onSegmentButtonPress(tab)}
        first={first}
        last={last}
      >
        <Text style={[styles.segmentButtonText, selected && styles.activeSegmentButtonText]}>
          {buttonName}
        </Text>
      </Button>
    );
  }

  render() {
    const { dataInitialized } = this.state;
    return (
      <View style={styles.container}>
        <Header hasSegment style={{ backgroundColor: COLORS.orange, width: '100%', borderBottomColor: 'black', borderBottomWidth: 2 }}>
            <Segment style={styles.segment}>
              {this.segmentButton('Specialty', 0, true, false)}
              {this.segmentButton('Top Deals', 1, false, false)}
              {this.segmentButton('Local Craft', 2, false, true)}
            </Segment>
        </Header>
        <ScrollView>
          <Filters 
            filterDrinks={this.filterDrinks}
          />
          <View>
            <FlatList
              data={this.state.deals}
              renderItem={({item}) => dataInitialized ? this.renderDrinkCards(item) : <DrinkCardPlaceholder /> }
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
    shadowOpacity: .3, 
    shadowOffset:{ width: 0, height: 3 },
    borderRadius: 5,
    backgroundColor: COLORS.white,
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
  segment: {
    backgroundColor: COLORS.orange,
  },
  segmentButton: {
    borderColor: COLORS.white,
    borderWidth: 3
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
