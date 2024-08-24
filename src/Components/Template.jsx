
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Css/Template.css';

function Template() {
  const [cv, setCv] = useState({
    full_name: 'My-CV',
    email: 'myCV.com',
    phone: '000-000000',
    address: 'MyCV address',
    education: 'Education',
    experience: ' Experience',
    skills: ' Skills',
  });

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state && state.cv) {
      setCv(state.cv); 
    } else {
      async function fetchLatestCv() {
        try {
          const response = await axios.get('http://localhost:5000/api/cvs/latest');
          setCv(response.data);
        } catch (error) {
          console.error('Error fetching the latest CV:', error);
        }
      }
      fetchLatestCv();
    }
  }, [state]);

  return (
    <div className="resume">
      <header className="resume-header">
        <h1>{cv.full_name}</h1>
        <div className="contact-info">
          <p>{cv.email}</p>
          <p>{cv.phone}</p>
          <p>{cv.address}</p>
        </div>
      </header>
      <section className="resume-section">
        <h2>Education</h2>
        <p>{cv.education}</p>
      </section>
      <section className="resume-section">
        <h2>Experience</h2>
        <p>{cv.experience}</p>
      </section>
      <section className="resume-section">
        <h2>Skills</h2>
        <p>{cv.skills}</p>
      </section>
    </div>
  );
}

export default Template;
