import dynamicLinks from '@react-native-firebase/dynamic-links';

export const getInitialLink = async (handleDynamicLink) => {
  dynamicLinks()
    .getInitialLink()
    .then((link) => handleDynamicLink(link));
  const linkingListener = dynamicLinks().onLink(handleDynamicLink);
  return () => {
    linkingListener();
  };
};

// export const handleDynamicLink = (link) => {
//   if (link != null) {
//     this.props.navigation.navigate('Drink Details', {
//       docId: link.url.substr(43),
//     });
//   }
// };
