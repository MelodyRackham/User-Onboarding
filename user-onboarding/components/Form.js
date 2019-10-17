import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const NewUserForm = ({ values, touched, errors }) => {
  const [newUser, SetNewUser] = useState([]);

  useEffect(() => {
    status && SetNewUser(newUswer => [...newUser, status]);
  }, [status]);
  return (
    <div className='user-form'>
      <Form>
        <Field type='text' name='name' placeholder='name' />
        {touched.name && errors.name && <p className='error'>{errors.name}</p>}
        <Field type='text' name='email' placeholder='email' />
        {touched.email && errors.email && <p className='error'>{errors.email}</p>}
        <Field type='text' name='password' placeholder='password' />
        {touched.password && errors.password && <p className='error'>{errors.password}</p>}
        <label className='checkbox-container'>
          {' '}
          Terms of Service
          <Field type='checkbox' name='Terms of Service' checked={values.termsOfService} />
          <span className='checkmark' />
        </label>

        <button type='submit'> Submit!</button>
      </Form>
      {newUser.map(user => (
        <ul key={user.id}>
          <li> Name: {NewUser.name} </li>
          <li> Email: {NewUser.email} </li>
          <li> Password: {NewUser.password} </li>
          <li> TermsOfService: {NewUser.termsOfService} </li>
        </ul>
      ))}
    </div>
  );
};

const FormikNewUserForm = withFormik({
  mapPropsToValues({ name, email, password, termsOfService }) {
    return {
      name: name || '',
      email: email || '',
      password: password || ' ',
      termsOfService: termsOfService || false,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  },
})(NewUserForm);
export default FormikNewUserForm;
console.log('This is the HOC', FormikNewUserForm);
