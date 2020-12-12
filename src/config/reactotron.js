import Reactotron from 'reactotron-react-native'

if (__DEV__) {
  Reactotron
		.configure({
				name: 'Drinks App'
		}) // controls connection & communication settings
		.useReactNative() // add all built-in react native plugins
		.connect()

  console.tron = Reactotron;
} else {
  console.tron = { log: () => false };
}