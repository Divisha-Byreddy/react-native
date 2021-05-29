import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    paddingLeft : 15,
    color : '#d73a4a'
  },
  input : {
    margin : 15,
    borderWidth : 1,
    borderRadius : 5,
    padding : 10,
    height : 50
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style = {styles.input}
        secureTextEntry = {name === "password" ? true : false}
        borderColor = {showError ? "#d73a4a" : "grey"}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;