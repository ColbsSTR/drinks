import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import TopDeals from '../screens/TopDeals';
import DetailView from '../screens/DetailView';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import DrinkMap from '../screens/DrinkMap';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainStack = createStackNavigator();

function MapStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="DrinkMap" component={DrinkMap} 
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen 
        name="DetailView" 
        component={DetailView}
        tintColor='black'
        options={{
          headerStyle: {
            backgroundColor: '#ef8921',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'black'
        }}
      />
    </MainStack.Navigator>
  );
}

function HomeStack() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ef8921',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}
    >
      <MainStack.Screen name="TopDeals" component={TopDeals} />
      <MainStack.Screen 
        name="DetailView" 
        component={DetailView}
        tintColor='black'
        options={{
          headerTintColor: 'black'
        }}
      />
    </MainStack.Navigator>
  );
}

function ProfileStack () {
  const navigation = useNavigation();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ef8921',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}
    >
      <MainStack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Icon
                name='cog'
                type='font-awesome-5'
                size={25}
                color='lightgray'
                style={{ paddingRight: 12 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <MainStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTintColor: 'black'
        }}
      />
    </MainStack.Navigator>
  );
}

function Tabs() {
  return (
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
            case 'DrinkMap':
              iconName = focused ? 'map' : 'map';
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
      initialRouteName='TopDeals'
    >
      <Tab.Screen name="DrinkMap" component={MapStack} />
      <Tab.Screen name="TopDeals" component={HomeStack}/>
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export const RootNav = () => {
    const isGuest = useSelector(state => state.authentication.guest);
    const isSignedIn = useSelector(state => state.authentication.isSignedIn);

    return (
      <NavigationContainer>
        <Stack.Navigator>
        {isGuest || isSignedIn ? (
          <Stack.Screen
            name='Tabs'
            component={Tabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
        </Stack.Navigator>
      </NavigationContainer>
    );
}
