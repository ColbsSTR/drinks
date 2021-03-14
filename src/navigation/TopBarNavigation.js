import React from 'react';
import _ from 'lodash';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../assets/colors';

const Tab = createMaterialTopTabNavigator();

const renderTabs = tabs => _.map(tabs, tab => <Tab.Screen name={ tab.name } component={tab.component} options={{ title: tab.title }}/>);
export default ({ tabs }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: COLORS.lightOrange },
        indicatorStyle: { backgroundColor: COLORS.blue },
        labelStyle: { color: COLORS.white },
      }}
    >
      { renderTabs(tabs) }
    </Tab.Navigator>
  );
}