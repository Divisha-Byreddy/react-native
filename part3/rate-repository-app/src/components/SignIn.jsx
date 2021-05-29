import { Formik } from 'formik';
import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import Text from './Text';
import userSignIn from '../hooks/userSignIn';
import { useHistory } from 'react-router';

const initialValues = {
  username : "",
  password : ""
};

const styles = StyleSheet.create({
  submit : {
    backgroundColor : theme.colors.primary,
    margin : 15,
    height : 50,
    fontSize : 20,
    color : "white",
    padding : 10,
    textAlign : "center",
    borderRadius : 5
  },
});

const validationSchema = yup.object().shape({
  username : yup.string().min(3, 'Username length must be greater than 2').required('Username is required'),
  password : yup.string().min(5,'Password length must be greater than 4').required('Password is required'),
});

const SignInForm = ({onSubmit}) => {
  return(
    <View>
      <FormikTextInput name = "username" placeholder = "Username"/>
      <FormikTextInput name = "password" placeholder = "Password"/>
      <Pressable onPress = {onSubmit}>
        <Text style ={styles.submit}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = userSignIn();
  const history = useHistory();
  const onSubmit = async (values) =>{
    const { username, password } = values;

    try {
      const {data} = await signIn({ username, password });
      console.log(data);
      history.push('/');
    } catch (e) {
      console.error(e);
    }

  };

  return (
    <Formik 
      initialValues = {initialValues} 
      onSubmit = {onSubmit}
      validationSchema = {validationSchema}
    >
      {({handleSubmit}) => <SignInForm onSubmit = {handleSubmit}/>}
    </Formik>
  );
};

export default SignIn;