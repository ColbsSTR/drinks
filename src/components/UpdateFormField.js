import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Form, Item, Label, Input, Text } from 'native-base';
import COLORS from '../assets/colors';

export const UpdateFormField = (props) => {
  const renderSaveButton = (props, newValue) => {
    if (newValue !== props.fieldValue) {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={styles.headerButton} onPress={() => props.route.params.updateFieldValue(newValue)}>
            <Text style={styles.headerText}>Save</Text>
          </TouchableOpacity>
        )
      });
    } else {
      props.navigation.setOptions({
        headerRight: null,
      });
    }
  }

  const { fieldValue, fieldType } = props.route.params;
  return (
    <View style={styles.container}>
      <Form>
        <Item fixedLabel>
          <Label>{fieldType}</Label>
          <Input defaultValue={fieldValue} onChangeText={(newValue) => renderSaveButton(props, newValue)}/>
        </Item>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: COLORS.blue,
  },
  headerButton: {
    paddingRight: 10,
  }
});