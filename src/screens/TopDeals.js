import React, {Component} from 'react';
import {Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Icon, colors} from 'react-native-elements';
import {Container, Content, Card, CardItem, Body, Left} from 'native-base';
import {getTopDeals} from '../state/Actions/topDeals';
import {connect} from 'react-redux';

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
      deals: [],
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.props.getTopDeals();
  }

  itemCard(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('DetailView', {item});
        }}>
        <Content style={{padding: 5, height: 150}}>
          <Card>
            <CardItem header bordered style={styles.card}>
              <Left>
                <Icon name="glass" type="font-awesome" />
                <Body>
                  <Text style={{color: 'darkblue', paddingBottom: 5}}>
                    {item.Name}
                  </Text>
                  <Text>${item.Price}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={styles.card}>
              <Body>
                <Text>{item.Description}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container style={styles.background}>
        <Content>
          <FlatList
            data={this.props.topDeals}
            renderItem={({item}) => this.itemCard(item)}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#EFEFEF',
  },
  card: {
    backgroundColor: colors.white,
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
