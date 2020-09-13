import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TopDeals from '../screens/TopDeals';
import DetailView from '../screens/DetailView';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="TopDeals" component={TopDeals} />
      <HomeStack.Screen name="DetailView" component={DetailView} />
    </HomeStack.Navigator>
  );
}

export const RootNav = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="HomeStack" component={HomeStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
}