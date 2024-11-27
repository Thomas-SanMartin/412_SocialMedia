const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT U_ID, U_NAME FROM APP_USER;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server error');
  }
});

app.get('/profiles/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await db.query(
        'SELECT P_ID, P_NAME FROM PROFILE WHERE U_ID = $1;',
        [userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      res.status(500).send('Server error');
    }
  });

  app.get('/profile/:profileId', async (req, res) => {
    const { profileId } = req.params;
    try {
      const result = await db.query(
        'SELECT P_ID, P_NAME, P_EMAIL, P_USERNAME, P_DATEMADE FROM PROFILE WHERE P_ID = $1;',
        [profileId]
      );
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send('Profile not found');
      }
    } catch (err) {
      console.error('Error fetching profile details:', err);
      res.status(500).send('Server error');
    }
  });

  app.post('/profiles', async (req, res) => {
    const { u_id, p_name, p_email, p_username, p_password } = req.body;
    try {
      const result = await db.query(
        'INSERT INTO PROFILE (P_DATEMADE, P_NAME, P_EMAIL, P_USERNAME, P_PASSWORD, U_ID) VALUES (CURRENT_DATE, $1, $2, $3, $4, $5) RETURNING *;',
        [p_name, p_email, p_username, p_password, u_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error creating profile:', err);
      res.status(500).send('Server error');
    }
  });
  
  
  

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
