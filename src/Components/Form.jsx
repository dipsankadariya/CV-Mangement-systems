
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Form.css';

function Form() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    skills: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cvs', formData);
      navigate('/CVList'); //
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='form-container'>
      <h2>CV Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='full_name'>Full Name:</label>
          <input
            type='text'
            id='full_name'
            name='full_name'
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone:</label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='education'>Education:</label>
          <textarea
            id='education'
            name='education'
            value={formData.education}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='experience'>Experience:</label>
          <textarea
            id='experience'
            name='experience'
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='skills'>Skills:</label>
          <textarea
            id='skills'
            name='skills'
            value={formData.skills}
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
