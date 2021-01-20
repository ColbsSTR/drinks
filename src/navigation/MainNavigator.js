import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Icon } from 'react-native-elements';
import TopDeals from '../screens/TopDeals';
import DetailView from '../screens/DetailView';
import Login from '../screens/Login';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ef8921',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}
    >
      <HomeStack.Screen name="TopDeals" component={TopDeals} />
      <HomeStack.Screen 
        name="DetailView" 
        component={DetailView}
        tintColor='black'
        options={{
          headerTintColor: 'black'
        }}
      />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ef8921',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}
    >
      <ProfileStack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen 
        name="DetailView" 
        component={DetailView}
        tintColor='black'
        options={{
          headerTintColor: 'black'
        }}
      />
    </ProfileStack.Navigator>
  );
}

export const RootNav = () => {
    const isGuest = useSelector(state => state.authentication.guest);
    const isSignedIn = useSelector(state => state.authentication.isSignedIn);

    return (
      <NavigationContainer>
        {isGuest || isSignedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;

              switch(route.name) {
                case 'TopDeals':
                  iconName = focused ? 'fire' : 'fire';
                  break;
                case 'Profile':
                  iconName = focused ? 'user' : 'user';
                  break;
                default:
                  break;
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
            activeTintColor: '#fca311',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="TopDeals" component={HomeStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
        ) : (
          <AuthStack.Navigator
            screenOptions={{headerShown: false}}
          >
            <AuthStack.Screen
              name="Login"
              component={Login}
            />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    );
}