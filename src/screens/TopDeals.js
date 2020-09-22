import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { Icon, colors } from 'react-native-elements'
import { Container, Content, Card, CardItem, Body, Left } from 'native-base';

const TabIcon = (props) => (
    <Icon
	    name='home'
  		type='font-awesome'
        size={35}
        color={props.focused ? 'grey' : 'darkgrey'}
    />
)

export default class TopDeals extends Component {
    static navigationOptions = {
        tabBarIcon: TabIcon
    };

    constructor(props) {
        super(props);

        this.state = {
            //Placeholder data until the database is setup
            items:  [
                {
                  name: 'Cosmopolitan',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                  price: '10',
                  venue: 'Georges',
                  open: true
                },
                {
                  name: 'Crowne and Coke',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                  price: '5',
                  venue: 'Mojitos',
                  open: true,
                },
                {
                    name: 'Moscow Mule',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                    price: '50',
                    venue: 'Appleby',
                    open: false,
                  },
                  {
                    name: 'Margarhettia',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                    price: '25',
                    venue: 'Mojitos',
                    open: true,
                  },
              ],
              modalVisible: false
        };
    }

    componentDidMount() {

    }

    itemCard(item) {
        return (
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('DetailView', {item})}}>
                <Content style={{ padding: 5 }}>
                    <Card>
                        <CardItem header bordered style={styles.card}>
                            <Left>
                                <Icon
                                    name='glass'
                                    type='font-awesome'
                                />
                                <Body>
                                    <Text style={{ color: 'darkblue', paddingBottom: 5}}>{item.name}</Text>
                                    <Text>${item.price}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem style={styles.card}>
                            <Body>
                                <Text>{item.description}</Text>
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
                        data={this.state.items}
                        renderItem={({item}) => this.itemCard(item)}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
   background: {
       backgroundColor: '#EFEFEF'
   },
   card: {
       backgroundColor: colors.white
   }
});