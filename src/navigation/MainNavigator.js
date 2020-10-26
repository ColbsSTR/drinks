import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Icon } from 'react-native-elements';
import TopDeals from '../screens/TopDeals';
import DetailView from '../screens/DetailView';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="TopDeals" component={TopDeals} />
      <HomeStack.Screen name="DetailView" component={DetailView} />
    </HomeStack.Navigator>
  );
}

export const RootNav = () => {
    const isSignedIn = useSelector(state => state.authentication.guest);
  
    return (
      <NavigationContainer>
        {isSignedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'TopDeals') {
                iconName = focused
                  ? 'fire'
                  : 'fire';
              }

              return <Icon
                name={iconName}
                type='font-awesome-5'
                size={25}
                color={color}
              />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="TopDeals" component={HomeStackScreen} />
        </Tab.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="Login"
              component={Login}
            />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    );
}