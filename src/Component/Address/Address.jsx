import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Address.css';

const Address = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      place: '',
      state: '',
      city: '',
      pincode: '',
      phno: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      place: Yup.string().required('Place is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      pincode: Yup.string()
        .matches(/^\d{6}$/, 'Valid Pincode is required (6 digits)')
        .required('Pincode is required'),
      phno: Yup.string()
        .matches(/^\d{10}$/, 'Valid Phone Number is required (10 digits)')
        .required('Phone Number is required'),
    }),
    onSubmit: async (values) => {
      const newOrder = {
        fullName: values.name,
        phoneNumber: values.phno,
        address: values.place,
        state: values.state,
        pincode: values.pincode,
        cartitems: [], 
        Date: new Date().toISOString(),
        totalAmount: 0, 
      };

      try {
        const userId = 'user-id'; 
        await axios.post('http://localhost:3000/totalorders', { ...newOrder });
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          order: [newOrder], 
          cartitems: [newOrder], 
        });
        alert('Order placed successfully');
        navigate('/payment'); 
      } catch (error) {
        navigate('/payment'); 
        console.error('Error placing order:', error);
      }
    },
  });

  return (
    <div className="img address-container">
      <h2 className="address-title">Enter Your Address</h2>
      <form onSubmit={formik.handleSubmit} className="address-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`form-control ${
              formik.touched.name && formik.errors.name ? 'is-invalid' : ''
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="error-text">{formik.errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.place}
            className={`form-control ${
              formik.touched.place && formik.errors.place ? 'is-invalid' : ''
            }`}
          />
          {formik.touched.place && formik.errors.place && (
            <span className="error-text">{formik.errors.place}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
            className={`form-control ${
              formik.touched.state && formik.errors.state ? 'is-invalid' : ''
            }`}
          />

          {formik.touched.state && formik.errors.state && (
            <span className="error-text">{formik.errors.state}</span>
          )}

        </div>

        <div className="form-group">

          <label htmlFor="city">City:</label>

          <input
            type="text"
            id="city"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className={`form-control ${
              formik.touched.city && formik.errors.city ? 'is-invalid' : ''
            }`}
          />

          {formik.touched.city && formik.errors.city && (
            <span className="error-text">{formik.errors.city}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pincode}
            className={`form-control ${
              formik.touched.pincode && formik.errors.pincode ? 'is-invalid' : ''
            }`}
          />
          {formik.touched.pincode && formik.errors.pincode && (
            <span className="error-text">{formik.errors.pincode}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phno">Phone Number:</label>
          <input
            type="text"
            id="phno"
            name="phno"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phno}
            className={`form-control ${
              formik.touched.phno && formik.errors.phno ? 'is-invalid' : ''
            }`}
          />
          {formik.touched.phno && formik.errors.phno && (
            <span className="error-text">{formik.errors.phno}</span>
          )}
        </div>

        <button type="submit" className="btn submit-btn">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Address;
