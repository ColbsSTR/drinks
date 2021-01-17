import firestore from '@react-native-firebase/firestore';

const getUserData = async (user) => {
	try {
		const userDoc = await firestore().collection('Users').doc(user.user.uid).get();
		return userDoc;
	} catch(err) {
		throw err;
	}
}

export const addLikedDrink = async (data, user) => {
	try {
		const { drinkId } = data;
		const userData = await getUserData(user);

		if (userData) {
			const newLikedDrinks = userData.data().LikedDrinks.concat(drinkId);
			try {
				const result = await firestore().collection('Users').doc(user.user.uid).update({
					LikedDrinks: newLikedDrinks,
				});
				return result;
			} catch(err) {
				console.tron.log('failed adding new', err);
				throw err;
			}
		} else {
			throw new Error('Must be signed in to continue.');
		}
	} catch(err) {
		throw err;
	}
}

export const removeLikedDrink = async (data, user) => {
	try {
		const { drinkId } = data;
		const userData = await getUserData(user);

		if (userData) {
			const updatedLikedDrinks = userData.data().LikedDrinks;
			const indexOfDrink = updatedLikedDrinks.indexOf(drinkId);
			if (indexOfDrink > -1) { updatedLikedDrinks.splice(indexOfDrink, 1) }

			try {
				const result = await firestore().collection('Users').doc(user.user.uid).update({
					LikedDrinks: updatedLikedDrinks,
				});
				return result;
			} catch(err) {
				console.tron.log('failed removing drink', err);
				throw err;
			}
		} else {
			throw new Error('Must be signed in to continue.');
		}
	} catch(err) {
		throw err;
	}
}

//Modify drink method that looks just like the above two but has a callback function to get the new array

export const getLikedDrinks = async (user) => {
	try {
		const userDoc = await getUserData(user);
		return userDoc.data().LikedDrinks;
	} catch(err) {
		throw err;
	}
}