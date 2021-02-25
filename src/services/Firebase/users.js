import firestore from '@react-native-firebase/firestore';

export const createNewUser = async (user) => {
	try {
		const userDoc = await firestore().collection('Users').doc(user.uid).set({
            Email: user.email,
            LikedDrinks: [],
            Name: user.displayName,
        });
		return userDoc;
	} catch(err) {
		throw err;
	}
}

export const isNewUser = async (user) => {
    try {
        const userDoc = await firestore().collection('Users').doc(user.uid).get();

        if (!userDoc.data()) {
            return true;
        }
        return false;
    } catch(err) {
        throw new Error('Could not retrieve user information.');
    }
}
