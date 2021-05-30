import { Formik } from 'formik';
import React from 'react';
import { Pressable, View } from 'react-native';
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

const validationSchema = yup.object().shape({
  username : yup.string().min(3, 'Username length must be greater than 2').required('Username is required'),
  password : yup.string().min(5,'Password length must be greater than 4').required('Password is required'),
});

export const SignInForm = ({onSubmit}) => {
  return(
    <View>
      <FormikTextInput name = "username" placeholder = "Username" testID= "usernameField"/>
      <FormikTextInput name = "password" placeholder = "Password" testID = "passwordField"/>
      <Pressable onPress = {onSubmit} testID = "submitButton">
        <Text style ={theme.submit}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
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

  return <SignInContainer onSubmit = {onSubmit}/>;
};

export default SignIn;