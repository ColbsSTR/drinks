import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import DrinkSnippetCard from '../components/DrinkSnippetCard';

class LikedDrinks extends Component {
  constructor(props) {
    super(props);
  }

  RenderDrinkCards = (drink) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('Drink Details', {docId: drink.docId});
      }}>
      <DrinkSnippetCard drink={drink} large={true} />
    </TouchableOpacity>
  );

  render() {
    const likedDrinks = this.props.drinks.filter((drink) => drink.liked);
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={likedDrinks}
          renderItem={({item}) => this.RenderDrinkCards(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    likedDrinks: state.drinks.likedDrinks,
    drinks: state.drinks.allDrinks,
  };
};

export default connect(mapStateToProps, null)(LikedDrinks);
