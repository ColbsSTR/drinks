import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import TopDeals from '../screens/TopDeals';
import DetailView from '../screens/DetailView';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import DrinkMap from '../screens/DrinkMap';
import SplashScreen from '../screens/SplashScreen';
import AddDrink from '../screens/AddDrink';
import BarAdminProfile from '../screens/BarAdminProfile';
import {UpdateFormField} from '../components/UpdateFormField';
import {loginSucceeded} from '../state/Actions/authentication';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainStack = createStackNavigator();

function MapStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Drink Map"
        component={DrinkMap}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Drink Details"
        component={DetailView}
        tintColor="black"
        options={{
          headerStyle: {
            backgroundColor: '#ef8921',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'black',
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
      }}>
      <MainStack.Screen
        name="Top Deals"
        component={TopDeals}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Drink Details"
        component={DetailView}
        tintColor="black"
        options={{
          headerTintColor: 'black',
        }}
      />
    </MainStack.Navigator>
  );
}

function ProfileStack() {
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
      }}>
      <MainStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTintColor: 'black',
        }}
      />
      <MainStack.Screen
        name="UpdateFormField"
        component={UpdateFormField}
        options={{
          title: 'Update Profile',
          headerTintColor: 'black',
        }}
      />
      <MainStack.Screen
        name="Drink Details"
        component={DetailView}
        tintColor="black"
        options={{
          headerTintColor: 'black',
        }}
      />
    </MainStack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          switch (route.name) {
            case 'Top Deals':
              iconName = focused ? 'glass-cheers' : 'glass-cheers';
              break;
            case 'Profile':
              iconName = focused ? 'user' : 'user';
              break;
            case 'Drink Map':
              iconName = focused ? 'map' : 'map';
              break;
            default:
              break;
          }

          return (
            <Icon
              name={iconName}
              type="font-awesome-5"
              size={route.name === 'Top Deals' ? 30 : 23}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#fca311',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Top Deals">
      <Tab.Screen name="Drink Map" component={MapStack} />
      <Tab.Screen name="Top Deals" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

function AddDrinkStack() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ef8921',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}>
      <MainStack.Screen
        name="AddDrink"
        component={AddDrink}
        options={{
          title: 'Add Drink',
        }}
      />
    </MainStack.Navigator>
  );
}

function BarAdminProfileStack() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ef8921',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}>
      <MainStack.Screen
        name="BarAdminProfile"
        component={BarAdminProfile}
        options={{
          title: 'Profile',
        }}
      />
    </MainStack.Navigator>
  );
}

function BarOwnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          switch (route.name) {
            case 'AddDrink':
              iconName = focused ? 'plus-circle' : 'plus-circle';
              break;
            case 'BarAdminProfile':
              iconName = focused ? 'user' : 'user';
              break;
            default:
              break;
          }
          return <Icon name={iconName} type="feather" color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#fca311',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="AddDrink">
      <MainStack.Screen name="AddDrink" component={AddDrinkStack} />
      <MainStack.Screen
        name="BarAdminProfile"
        component={BarAdminProfileStack}
      />
    </Tab.Navigator>
  );
}

export const RootNav = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    user && dispatch(loginSucceeded(user)); //On logout, user will be null
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          user.email === 'addadrink123@gmail.com' ? (
            <Stack.Screen
              name="BarOwner"
              component={BarOwnerTabs}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
          )
        ) : initializing ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
