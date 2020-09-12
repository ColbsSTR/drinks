import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TopDeals from '../screens/TopDeals';

const Tab = createBottomTabNavigator();

export const RootNav = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="TopDeals" component={TopDeals} />
        </Tab.Navigator>
      </NavigationContainer>
    );
}