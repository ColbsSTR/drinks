import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {Button, Icon} from 'native-base';
import RBSheet from 'react-native-raw-bottom-sheet';
import _ from 'lodash';
import COLORS from '../../assets/colors';
import {FilterButton} from './FilterButton';
import {FilterItem} from './FilterItem';
import {ActiveFilterButton} from './ActiveFilterButton';
import {distances, types, prices} from '../../language/locales/filters/index';
import isLocationAvailable from '../../services/isLocationAvailable';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilterType: null,
      selectedType: null,
      selectedPrice: null,
      selectedDistance: null,
      filterTypes: ['Type', 'Price', 'Distance'],
    };
  }

  handleFilterPress = async (filterType) => {
    if (filterType === 'Distance') {
      const locationAvailable = await isLocationAvailable();
      if (locationAvailable) {
        this.setState({selectedFilterType: filterType});
        this.RBSheet.open();
      } else {
        Alert.alert(
          "Sorry, we can't locate you. Enable DrinksApp for location services in settings.",
        );
      }
    } else {
      this.setState({selectedFilterType: filterType});
      this.RBSheet.open();
    }
  };

  handleFilterItemPress = (filterValue) => {
    const {selectedFilterType} = this.state;
    this.props.filterDrinks({
      type: selectedFilterType,
      value: filterValue.value,
    });

    switch (selectedFilterType) {
      case 'Type':
        this.setState({selectedType: filterValue});
        break;
      case 'Price':
        this.setState({selectedPrice: filterValue});
        break;
      case 'Distance':
        this.setState({selectedDistance: filterValue});
        break;
      default:
        break;
    }
    this.RBSheet.close();
  };

  determineFilters = (type) => {
    return {
      Type: types,
      Price: prices,
      Distance: distances,
    }[type];
  };

  isSelected = (filterValue) => {
    const {
      selectedType,
      selectedPrice,
      selectedDistance,
      selectedFilterType,
    } = this.state;
    const selectedFilterItem = {
      Type: selectedType,
      Price: selectedPrice,
      Distance: selectedDistance,
    }[selectedFilterType];
    return filterValue.value === selectedFilterItem?.value;
  };

  BottomSheet = () => {
    const {selectedFilterType} = this.state;
    const filters = this.determineFilters(selectedFilterType);
    return (
      <RBSheet
        ref={(ref) => {
          this.RBSheet = ref;
        }}
        height={300}
        openDuration={250}>
        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 30}}>
          {_.map(filters, (filterValue) => (
            <FilterItem
              filterValue={filterValue}
              handleFilterItemPress={this.handleFilterItemPress}
              selected={this.isSelected(filterValue)}
            />
          ))}
        </View>
      </RBSheet>
    );
  };

  removeFilter = (type) => {
    this.props.filterDrinks({type: type, value: 'All'});

    switch (type) {
      case 'Type':
        this.setState({selectedType: null});
        break;
      case 'Price':
        this.setState({selectedPrice: null});
        break;
      case 'Distance':
        this.setState({selectedDistance: null});
        break;
      default:
        break;
    }
  };

  render() {
    const {
      filterTypes,
      selectedType,
      selectedPrice,
      selectedDistance,
    } = this.state;
    return (
      <>
        <View style={styles.filterContainer}>
          <View style={styles.stickyItem}>
            <Button
              disabled
              style={{backgroundColor: COLORS.orange, width: 55}}>
              <Icon
                name="md-filter-sharp"
                type="ionicons"
                size={35}
                style={{color: 'white'}}
              />
            </Button>
          </View>
          <ScrollView
            horizontal
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={false}>
            {selectedType && selectedType.value !== 'All' && (
              <ActiveFilterButton
                filterValue={selectedType.text}
                onPress={() => this.removeFilter('Type')}
              />
            )}
            {selectedPrice && selectedPrice.value !== 'All' && (
              <ActiveFilterButton
                filterValue={selectedPrice.text}
                onPress={() => this.removeFilter('Price')}
              />
            )}
            {selectedDistance && selectedDistance.value !== 'All' && (
              <ActiveFilterButton
                filterValue={selectedDistance.text}
                onPress={() => this.removeFilter('Distance')}
              />
            )}
            {_.map(filterTypes, (filterType) => (
              <FilterButton
                filterType={filterType}
                handleFilterPress={this.handleFilterPress}
              />
            ))}
          </ScrollView>
        </View>
        {this.BottomSheet()}
      </>
    );
  }
}

export default Filters;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: COLORS.backgroundWhite,
  },
  stickyItem: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
    top: 10,
    paddingRight: 8,
    backgroundColor: COLORS.backgroundWhite,
    width: 58,
  },
  scrollView: {
    marginLeft: 35,
  },
  scrollViewContent: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 13,
  },
});
