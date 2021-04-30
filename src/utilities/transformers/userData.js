export const transformUserData = ({dbData, authData}) => {
  const {displayName, providerData, photoURL, uid, email} = authData;
  const combinedData = {...dbData, displayName, providerData, photoURL, uid, email};
  return combinedData;
};
