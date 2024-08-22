import React, { useState, useEffect } from 'react';
import '../Css/CVList.css';

function CVList() {
  
  const defaultCv = {
    FullName: 'Naruto Uzumaki',
    Email: 'naruto.uzumaki@hokage.com',
    Phone: '123-456-7890',
    Address: 'Konohagakure, Land of Fire',
    Education: 'Graduated from the Ninja Academy',
    Experience: '7 years as a Ninja',
    Skills: 'Shadow Clone Jutsu, Rasengan, Sage Mode',
  };


  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    
    const storedCvs = JSON.parse(localStorage.getItem('cvs')) || [];
    
   
    if (storedCvs.length === 0) {
      setCvs([defaultCv]);
    } else {
      setCvs(storedCvs);
    }
  }, []);

  return (
    <div className="cv-list">
      <h2>CV List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Education</th>
            <th>Experience</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {cvs.map((cv, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{cv.FullName}</td>
              <td>{cv.Email}</td>
              <td>{cv.Phone}</td>
              <td>{cv.Address}</td>
              <td>{cv.Education}</td>
              <td>{cv.Experience}</td>
              <td>{cv.Skills}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CVList;
