import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
      });

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value,});
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) {
          newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
          newErrors.lastName = 'Last Name is required';
        }
        if (!formData.address) {
          newErrors.address = 'Address is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem('all_data', JSON.stringify(formData));
        if (validateForm()){
            try {
                const newItem = {
                  data: formData,
                };
                await axios.post('http://localhost:5000/items', newItem); //http://localhost:5000/items its a dummy server URL
                alert('Item created successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    address: '',
                    email: '',
                  })
              } catch (error) {
                console.error('Error creating item:', error);
              }
        }
      };
  return (
    <>
    <Grid container className='form_ui' >
        <Grid item xs={12} sm={6}>
            <TextField className='inputbx' fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField className='inputbx' fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField className='inputbx' fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} error={!!errors.address} helperText={errors.address}  multiline rows={4} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField className='inputbx' fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
        </Grid>
        <Grid item xs={12} className='sub_btn_sec'><Button onClick={handleSubmit} className='button_submit'>Submit</Button></Grid>
    </Grid>
    
    </>
  )
}

export default Form