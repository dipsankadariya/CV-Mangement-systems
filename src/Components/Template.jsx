import React, { useState, useEffect } from 'react';
import '../Css/Template.css';

function Template() {
  const [cv, setCv] = useState({
    FullName: 'Naruto Uzumaki',
    Email: 'naruto.uzumaki@hokage.com',
    Phone: '123-456-7890',
    Address: 'Konohagakure, Land of Fire',
    Education: 'Graduated from the Ninja Academy',
    Experience: '7 years as a Ninja',
    Skills: 'Shadow Clone Jutsu, Rasengan, Sage Mode',
  });

  useEffect(() => {
    const storedCvs = JSON.parse(localStorage.getItem('cvs')) || [];
    if (storedCvs.length > 0) {
      setCv(storedCvs[storedCvs.length - 1]);
    }
  }, []);

  return (
    <div className="resume">
      <header className="resume-header">
        <h1>{cv.FullName}</h1>
        <div className="contact-info">
          <p>{cv.Email}</p>
          <p>{cv.Phone}</p>
          <p>{cv.Address}</p>
        </div>
      </header>
      <section className="resume-section">
        <h2>Education</h2>
        <p>{cv.Education}</p>
      </section>
      <section className="resume-section">
        <h2>Experience</h2>
        <p>{cv.Experience}</p>
      </section>
      <section className="resume-section">
        <h2>Skills</h2>
        <p>{cv.Skills}</p>
      </section>
    </div>
  );
}

export default Template;