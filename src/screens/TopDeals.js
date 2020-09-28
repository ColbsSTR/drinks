import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon, colors } from 'react-native-elements'
import { Container, Content, Card, CardItem, Body, Left } from 'native-base';
import firestore from '@react-native-firebase/firestore';

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
            items: [],
            modalVisible: false
        };
    }

    componentDidMount() {
        let itemsArray = this.state.items;

        firestore().collection('Drinks').where('TopDeal', '==', 'true').get().then(snap => {
            snap.forEach(doc => {
                itemsArray.push(doc.data());
            });

            this.setState({
                items: itemsArray
            })
        });
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
                                    <Text style={{ color: 'darkblue', paddingBottom: 5}}>{item.Name}</Text>
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