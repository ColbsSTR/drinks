import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
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
import COLORS from '../assets/colors';
import EditDrink from '../screens/EditDrink';
import VenueProfile from '../screens/VenueProfile';
import RedeemedDrink from '../screens/RedeemedDrink';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainStack = createStackNavigator();

function MapStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="DrinkMap"
        component={DrinkMap}
        options={{
          headerShown: false,
          title: 'Drink Map',
        }}
      />
      <MainStack.Screen
        name="DetailView"
        component={DetailView}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: COLORS.orange,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'black',
        }}
      />
      <MainStack.Screen
        name="VenueProfile"
        component={VenueProfile}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="RedeemedDrink"
        component={RedeemedDrink}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
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
        name="TopDeals"
        component={TopDeals}
        options={{headerShown: false, title: 'Top Deals'}}
      />
      <MainStack.Screen
        name="DetailView"
        component={DetailView}
        tintColor="black"
        options={{
          title: '',
          headerTintColor: 'black',
        }}
      />
      <MainStack.Screen
        name="VenueProfile"
        component={VenueProfile}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="RedeemedDrink"
        component={RedeemedDrink}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
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
        name="DetailView"
        component={DetailView}
        tintColor="black"
        options={{
          title: '',
          headerTintColor: 'black',
        }}
      />
      <MainStack.Screen
        name="VenueProfile"
        component={VenueProfile}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="RedeemedDrink"
        component={RedeemedDrink}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </MainStack.Navigator>
  );
}

export const getTabBarLabel = (route) => {
  return {
    TopDeals: 'TopDeals',
    DrinkMap: 'DrinkMap',
    Profile: 'Profile',
  }[route];
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: getTabBarLabel(route.name),
        tabBarIcon: ({focused, color}) => {
          let iconName;

          switch (route.name) {
            case 'TopDeals':
              iconName = focused ? 'glass-cheers' : 'glass-cheers';
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

          return (
            <Icon
              name={iconName}
              type="font-awesome-5"
              size={route.name === 'TopDeals' ? 30 : 23}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#fca311',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="TopDeals">
      <Tab.Screen
        name="DrinkMap"
        component={MapStack}
        options={{tabBarLabel: 'Drink Map'}}
      />
      <Tab.Screen
        name="TopDeals"
        component={HomeStack}
        options={{tabBarLabel: 'Top Deals'}}
      />
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
      <MainStack.Screen
        name="EditDrink"
        component={EditDrink}
        options={{
          title: 'Edit Drink',
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
      <MainStack.Screen name="BarAdminProfile" component={BarAdminProfileStack} />
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
            <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
          )
        ) : initializing ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
