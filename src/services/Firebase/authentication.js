import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { facebook, google } from '../../language/keys/authentication/signInProvider';

export const login = async (loginProvider) => {
  try {
    switch(loginProvider) {
      case facebook:
        const fbUser = await loginWithFacebook();
        return fbUser;
      case google:
        const googleUser = await loginWithGoogle();
        return googleUser;
      default:
        return null;
    }
  } catch(err) {
    throw err;
  }
}

export const loginWithFacebook = async () => {
    const result = await LoginManager.logInWithPermissions(["public_profile"]);
    if (result.isCancelled) {
      return null;
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Login Failed');
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    const user = await auth().signInWithCredential(facebookCredential);
    if (!user) {
      throw new Error('Login Fail');  
    }

    return user;
  }

  export const loginWithGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId: '645795511035-dd49nm6eeehikle217a8r5r0usekko6n.apps.googleusercontent.com',
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch(err) {
      throw err;
    }
  }

  export const logout = async () => {
    try {
      await auth().signOut();
    } catch(err) {
      throw err;
    }
  }