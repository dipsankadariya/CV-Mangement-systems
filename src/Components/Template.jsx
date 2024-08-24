import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Css/Template.css';

function Template() {
  const { state } = useLocation();
  const cv = state?.cv || {
    full_name: 'Default Name',
    email: 'default@example.com',
    phone: '000-000-0000',
    address: 'Default Address',
    education: 'Default Education',
    experience: 'Default Experience',
    skills: 'Default Skills',
  };

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
