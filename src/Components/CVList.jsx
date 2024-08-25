import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/CVList.css';

function CVList() {
  const [cvs, setCvs] = useState([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const defaultCVs = [
    {
      id: 1,
      full_name: 'Naruto Uzumaki',
      email: 'naruto.uzumaki@hokage.com',
      phone: '123-456-7890',
      address: 'Konohagakure, Land of Fire',
      education: 'Graduated from the Ninja Academy',
      experience: '7 years as a Ninja',
      skills: 'Shadow Clone Jutsu, Rasengan, Sage Mode',
    },
    {
      id: 2,
      full_name: 'Sakura Haruno',
      email: 'sakura.haruno@konoha.com',
      phone: '987-654-3210',
      address: 'Konohagakure, Land of Fire',
      education: 'Graduated from the Ninja Academy',
      experience: '5 years as a Medic Ninja',
      skills: 'Medical Ninjutsu, Strength Enhancement, Healing Jutsu',
    }
  ];

  useEffect(() => {
    async function fetchCvs() {
      try {
        const response = await axios.get(`${apiUrl}/cvs`);
        if (response.data.length > 0) {
          setCvs(response.data);
        } else {
          setCvs(defaultCVs);
        }
      } catch (error) {
        console.error('Error fetching CVs:', error);
        setCvs(defaultCVs);
      }
    }
    fetchCvs();
  }, [apiUrl]);

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