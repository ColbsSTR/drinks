import { LoginManager, AccessToken } from 'react-native-fbsdk'
import auth from '@react-native-firebase/auth';

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