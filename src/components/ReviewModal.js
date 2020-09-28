import React from 'react';
import {
    Modal,
    StyleSheet,
    View
  } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from '../state/Actions/modal';
import Stars from 'react-native-stars';
import { Icon, Button, Text } from "native-base";

export default ReviewModal = () => {
    const modalShown = useSelector(state => state.modals.showModal);
    const dispatch = useDispatch();

    return(
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalShown}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ paddingBottom: 15}}>
                <Text>How was this drink?</Text>
            </View>
            <Stars
                half={false}
                default={2.5}
                update={(val)=>{console.log(val)}}
                spacing={4}
                starSize={40}
                count={5}
                fullStar= {<Icon type="FontAwesome" name={'star'} style={[styles.myStarStyle]}/>}
                emptyStar= {<Icon type="FontAwesome" name={'star'} style={[styles.myEmptyStarStyle]}/>}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 15, flexDirection: 'row' }}>
                <Button bordered onPress={() => dispatch(closeModal())} style={{ margin: 5}}>
                    <Text>Cancel</Text>
                </Button>
                <Button bordered onPress={() => console.log('button pressed')} style={{ margin: 5}}>
                    <Text>Submit</Text>
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
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
    }
});



