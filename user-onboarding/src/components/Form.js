import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const NewUserForm = ({ values, touched, errors, status }) => {
  const [newUser, SetNewUser] = useState([]);

  useEffect(() => {
    status && SetNewUser(newUser => [...newUser, status]);
  }, [status]);

  return (
    <div className='user-form'>
      <h1>New User</h1>
      <Form>
        <Field type='text' name='name' placeholder='name' />
        {touched.name && errors.name && <p className='error'>{errors.name}</p>}
        <Field type='text' name='email' placeholder='email' />
        {touched.email && errors.email && <p className='error'>{errors.email}</p>}
        <Field type='password' name='password' placeholder='password' />
        {touched.password && errors.password && <p className='error'>{errors.password}</p>}
        <label className='checkbox-container'>
          {' '}
          Terms of Service
          <Field type='checkbox' name='Terms' checked={values.Terms} />
          <span className='checkmark' />
        </label>

        <button type='submit'> Submit! </button>
      </Form>
      {newUser.map(user => (
        <ul key={user.id}>
          <li> Name: {user.name} </li>
          <li> Email: {user.email} </li>
          <li> Password: {user.password.length} characters </li>
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
