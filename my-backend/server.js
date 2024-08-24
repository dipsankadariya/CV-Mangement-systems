const express = require('express');
const mysql = require('mysql2'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password12345',
  database: 'cv_management_system'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); 
  }
  console.log('Connected to the database');
});


const defaultCVs = [
  {
    full_name: 'Naruto Uzumaki',
    email: 'naruto.uzumaki@hokage.com',
    phone: '123-456-7890',
    address: 'Konohagakure, Land of Fire',
    education: 'Graduated from the Ninja Academy',
    experience: '7 years as a Ninja',
    skills: 'Shadow Clone Jutsu, Rasengan, Sage Mode',
  },
];


const initializeDefaultData = () => {
  db.query('SELECT COUNT(*) AS count FROM cvs', (err, results) => {
    if (err) {
      console.error('Error checking CV count:', err);
      return;
    }
    if (results[0].count === 0) {
      defaultCVs.forEach(cv => {
        db.query(
          'INSERT INTO cvs (full_name, email, phone, address, education, experience, skills) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [cv.full_name, cv.email, cv.phone, cv.address, cv.education, cv.experience, cv.skills],
          (err) => {
            if (err) {
              console.error('Error inserting default CV:', err);
            }
          }
        );
      });
    }
  });
};


initializeDefaultData();


app.get('/api/cvs', (req, res) => {
  db.query('SELECT * FROM cvs', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving CVs' });
      return;
    }
    res.json(results);
  });
});


app.get('/api/cvs/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM cvs WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving CV' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'CV not found' });
      return;
    }
    res.json(results[0]);
  });
});


app.post('/api/cvs', (req, res) => {
  const { full_name, email, phone, address, education, experience, skills } = req.body;
  db.query(
    'INSERT INTO cvs (full_name, email, phone, address, education, experience, skills) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [full_name, email, phone, address, education, experience, skills],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error adding CV' });
        return;
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
});


app.put('/api/cvs/:id', (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone, address, education, experience, skills } = req.body;
  db.query(
    'UPDATE cvs SET full_name = ?, email = ?, phone = ?, address = ?, education = ?, experience = ?, skills = ? WHERE id = ?',
    [full_name, email, phone, address, education, experience, skills, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: 'Error updating CV' });
        return;
      }
      res.status(200).json({ id, full_name, email, phone, address, education, experience, skills });
    }
  );
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
