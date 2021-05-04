import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, H2, H3} from 'native-base';
import {closeModal} from '../state/Actions/modal';
import COLORS from '../assets/colors';
import {useDescriptions} from '../language/locales/exclusiveDrinks/useDescriptions';

export const getDescription = (use) => {
  return useDescriptions[use];
};

export default RedeemDealModal = (props) => {
  const {drink} = props;
  const modalShown = useSelector((state) => state.modals.showModal);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {OriginalPrice, Uses} = drink.Exclusive;

  const redeemNow = () => {
    dispatch(closeModal());
    navigation.navigate('RedeemedDrink');
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalShown}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{paddingBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
              <H2 style={{fontWeight: '400', color: COLORS.backgroundWhite, paddingBottom: 10}}>
                {drink.Name}
              </H2>
              <H3 style={{fontWeight: '200', color: COLORS.backgroundWhite}}>
                {'Original Price - $' + OriginalPrice}
              </H3>
              <H3 style={{fontWeight: '200', color: COLORS.backgroundWhite}}>
                {'With Drinks - $' + drink.Price}
              </H3>
              <H3 style={{fontWeight: '200', color: COLORS.backgroundWhite, textAlign: 'center', paddingTop: 15}}>
                {getDescription(Uses)}
              </H3>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 15,
                flexDirection: 'row',
              }}>
              <Button bordered onPress={() => dispatch(closeModal())} style={{margin: 5, borderColor: 'white'}}>
                <Text style={{color: 'white'}}>Save For Later</Text>
              </Button>
              <Button bordered onPress={() => redeemNow()} style={{margin: 5, borderColor: 'white'}}>
                <Text style={{color: 'white'}}>Redeem Now</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.orange,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'grey',
  },
});
