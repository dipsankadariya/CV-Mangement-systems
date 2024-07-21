import React, { useState, useEffect } from 'react';
import '../Css/CVList.css';

function CVList() {
  // State to hold the list of CVs
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    //retrieve the stored CVs from localStorage
    // localStorage.getItem('cvs') fetches the data associated with the key 'cvs'...
    // tthis returns a JSON string or null if the key doesn't exist...
    // JSON.parse() converts the JSON string back into a JavaScript object/array....
    // || [] ensures that if localStorage.getItem('cvs') is null or JSON.parse() returns null...
    // an empty array is used as a fallback to avoid errors
    const storedCvs = JSON.parse(localStorage.getItem('cvs')) || [];
    
    // update the state with the retrieved CVs
    setCvs(storedCvs);
  }, []); // empty dependency array ensures this runs only once on component mount....

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
