import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Form.css';

function Form() {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Phone: '',
    Address: '',
    Education: '',
    Experience: '',
    Skills: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Retrieve existing CVs from localStorage
    const existingCvs = JSON.parse(localStorage.getItem('cvs')) || [];

    // Add the new CV to the existing CVs array
    const updatedCvs = [...existingCvs, formData];

    // Save the updated CVs array to localStorage
    localStorage.setItem('cvs', JSON.stringify(updatedCvs));

    console.log('Form Submitted', formData);
    navigate('/CVList'); // Navigate to the CVList page after submission
  };

  return (
    <div className='form-container'>
      <h2>CV Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='FullName'>Full Name:</label>
          <input
            type='text'
            id='FullName'
            name='FullName'
            placeholder='Enter your full name'
            value={formData.FullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='Email'>Email:</label>
          <input 
            type='email'
            id='Email'
            name='Email'
            placeholder='Enter your email address'
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='Phone'>Phone Number:</label>
          <input
            type='tel'
            id='Phone'
            name='Phone'
            placeholder='Enter your phone number'
            value={formData.Phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='Address'>Address:</label>
          <textarea
            id='Address'
            name='Address'
            placeholder='Enter your address'
            value={formData.Address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
         
        <div className='form-group'>
          <label htmlFor='Education'>Education:</label>
          <textarea
            id='Education'
            name='Education'
            placeholder='Enter your educational background'
            value={formData.Education}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='Experience'>Work Experience:</label>
          <textarea
            id='Experience'
            name='Experience'
            placeholder='Enter your work experience'
            value={formData.Experience}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='Skills'>Skills:</label>
          <textarea
            id='Skills'
            name='Skills'
            placeholder='Enter your skills'
            value={formData.Skills}
            onChange={handleChange}
            required
          />
        </div>
      
        <button type='submit'>Submit CV</button>
      </form>
    </div>
  );
}

export default Form;
