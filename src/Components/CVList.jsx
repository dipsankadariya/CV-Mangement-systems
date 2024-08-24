import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/CVList.css';

function CVList() {
  const [cvs, setCvs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCvs() {
      try {
        const response = await axios.get('http://localhost:5000/api/cvs');
        setCvs(response.data);
      } catch (error) {
        console.error('Error fetching CVs:', error);
      }
    }
    fetchCvs();
  }, []);

  const handleUpdateTemplate = (cv) => {
    navigate('/Template', { state: { cv } }); 
  };

  return (
    <div className='cv-list-container'>
      <h2>CV List</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Education</th>
            <th>Experience</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cvs.map((cv) => (
            <tr key={cv.id}>
              <td>{cv.full_name}</td>
              <td>{cv.email}</td>
              <td>{cv.phone}</td>
              <td>{cv.address}</td>
              <td>{cv.education}</td>
              <td>{cv.experience}</td>
              <td>{cv.skills}</td>
              <td>
                <button onClick={() => handleUpdateTemplate(cv)}>Update Template</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CVList;
