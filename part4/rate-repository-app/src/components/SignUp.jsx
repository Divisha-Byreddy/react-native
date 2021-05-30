import { Formik } from 'formik';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router';
import userSignIn from '../hooks/userSignIn';
import userSignUp from '../hooks/userSignUp';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';

const initialValues = {
  username : "",
  password : "",
  confirmPassword : ""
};

const validationSchema = yup.object().shape({
  username : yup.string().min(1,'Username length should be between 1 and 30').max(30).required('Username is required'),
  password : yup.string().required('Password is required').min(5,'Password length should be between 5 and 50').max(50,'Password length should be between 5 and 50'),
  confirmPassword : yup.string().oneOf([yup.ref('password'),null],'Passwords must match')
});

const SignUpForm = ({ onSubmit }) => {
  return(
    <View>
      <FormikTextInput name = "username" placeholder = "Username"/>
      <FormikTextInput name = "password" placeholder = "Password"/>
      <FormikTextInput name = "confirmPassword" placeholder = "Password Confirmation"/>
      <TouchableOpacity onPress = {onSubmit}>
        <Text style = {theme.submit}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};
const SignUp = () => {
  const [ signUp ] = userSignUp();  
  const [signIn] = userSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try{
      const { data } = await signUp({ username, password});
      console.log(data);
      await signIn({ username, password });
      history.push('/');
    }catch(e){
      console.error(e.message);
    }
  };

  return(
    <Formik
      initialValues = {initialValues}
      onSubmit = {onSubmit}
      validationSchema = { validationSchema }
    >
    {({ handleSubmit }) => <SignUpForm onSubmit = {handleSubmit}/>}
    </Formik>
  );
};

export default SignUp;