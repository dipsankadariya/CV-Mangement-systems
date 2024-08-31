const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'https://cv-mangement-systems.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

pool.connect((err) => {
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

const initializeDefaultData = async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) AS count FROM cvs');
    if (parseInt(result.rows[0].count) === 0) {
      for (const cv of defaultCVs) {
        await pool.query(
          'INSERT INTO cvs (full_name, email, phone, address, education, experience, skills) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [cv.full_name, cv.email, cv.phone, cv.address, cv.education, cv.experience, cv.skills]
        );
      }
      console.log('Default data initialized');
    }
  } catch (err) {
    console.error('Error initializing default data:', err);
  }
};

initializeDefaultData();

app.get('/', (req, res) => {
  res.send('CV Management System API is running');
});

app.get('/api/cvs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cvs');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving CVs:', err);
    res.status(500).json({ error: 'Error retrieving CVs' });
  }
});

app.get('/api/cvs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cvs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'CV not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error('Error retrieving CV:', err);
    res.status(500).json({ error: 'Error retrieving CV' });
  }
});

app.post('/api/cvs', async (req, res) => {
  const { full_name, email, phone, address, education, experience, skills } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cvs (full_name, email, phone, address, education, experience, skills) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [full_name, email, phone, address, education, experience, skills]
    );
    res.status(201).json({ id: result.rows[0].id, ...req.body });
  } catch (err) {
    console.error('Error adding CV:', err);
    res.status(500).json({ error: 'Error adding CV' });
  }
});

app.put('/api/cvs/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone, address, education, experience, skills } = req.body;
  try {
    await pool.query(
      'UPDATE cvs SET full_name = $1, email = $2, phone = $3, address = $4, education = $5, experience = $6, skills = $7 WHERE id = $8',
      [full_name, email, phone, address, education, experience, skills, id]
    );
    res.status(200).json({ id, full_name, email, phone, address, education, experience, skills });
  } catch (err) {
    console.error('Error updating CV:', err);
    res.status(500).json({ error: 'Error updating CV' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));