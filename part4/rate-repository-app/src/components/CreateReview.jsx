import { Formik } from 'formik';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router';

const initialValues = {
  username : "",
  repoName : "",
  rating : "",
  review : ""
};

const validationSchema = yup.object().shape({
  username : yup.string().required('Repository owner name is required'),
  repoName : yup.string().required('Repository name is required'),
  rating : yup.number().integer().min(0,'Rating should be between a to 100').max(100,'Rating should be between 0 to 100').required('Rating is required'),
  review : yup.string()
});

const ReviewForm = ({onSubmit}) => {
  return(
    <View>
      <FormikTextInput name = "username" placeholder = "Repository owner name"/>
      <FormikTextInput name = "repoName" placeholder = "Repository name"/>
      <FormikTextInput name = "rating" placeholder = "Rating between 0 and 100"/>
      <FormikTextInput name = "review" placeholder = "Review"/>
      <TouchableOpacity onPress = {onSubmit}>
        <Text style = {theme.submit}>create a review</Text>
      </TouchableOpacity>
    </View>
  );
};

const CreateReview = () => {
  const [ createReview ] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    values.rating = Number(values.rating);
    const { repoName, username, rating, review} = values;
    try{
      const { data } = await createReview({repoName, username, rating, review});
      history.push(`/${data.createReview.repositoryId}`);
    }catch(e){
      console.error(e.message);
    }
  };

  return(
    <Formik
      initialValues = {initialValues}
      onSubmit = {onSubmit}
      validationSchema = {validationSchema}
    >
      {({handleSubmit}) => <ReviewForm onSubmit = {handleSubmit}/>}
    </Formik>
  );
};

export default CreateReview;