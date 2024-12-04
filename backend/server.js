const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route to fetch all users
app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT U_ID, U_NAME FROM APP_USER;");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
});

// Route to fetch profiles
app.get("/profiles/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db.query(
      "SELECT P_ID, P_NAME FROM PROFILE WHERE U_ID = $1;",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).send("Server error");
  }
});

app.get("/profile/:profileId", async (req, res) => {
  const { profileId } = req.params;
  try {
    const result = await db.query(
      "SELECT P_ID, P_NAME, P_EMAIL, P_USERNAME, P_DATEMADE FROM PROFILE WHERE P_ID = $1;",
      [profileId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Profile not found");
    }
  } catch (err) {
    console.error("Error fetching profile details:", err);
    res.status(500).send("Server error");
  }
});

app.post("/profiles", async (req, res) => {
  const { u_id, p_name, p_email, p_username, p_password } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO PROFILE (P_DATEMADE, P_NAME, P_EMAIL, P_USERNAME, P_PASSWORD, U_ID) VALUES (CURRENT_DATE, $1, $2, $3, $4, $5) RETURNING *;",
      [p_name, p_email, p_username, p_password, u_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).send("Server error");
  }
});

app.get("/profile/:profileId/groups", async (req, res) => {
  const { profileId } = req.params;
  try {
    const result = await db.query(
      "SELECT G_ID, G_NAME FROM GROUPS WHERE G_CREATOR = $1;",
      [profileId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching groups:", err);
    res.status(500).send("Server error");
  }
});

app.get("/profile/:profileId/posts", async (req, res) => {
  const { profileId } = req.params;
  try {
    const result = await db.query(
      "SELECT P_ID, P_TEXT, P_CONTENT, P_DATE FROM POST WHERE P_POSTER = $1;",
      [profileId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).send("Server error");
  }
});

app.get("/profile/:profileId/comments", async (req, res) => {
  const { profileId } = req.params;
  try {
    const result = await db.query(
      `SELECT C.C_ID, C.C_POSTER, C.C_DATE, C.P_CONTENT
         FROM COMMENTS C
         JOIN POST P ON C.C_POSTER = P.P_POSTER
         WHERE P.P_POSTER = $1;`,
      [profileId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).send("Server error");
  }
});

app.get("/groups/:groupId", async (req, res) => {
  const { groupId } = req.params;
  try {
    const result = await db.query(
      "SELECT G_ID, G_NAME, G_MEMBERS, G_CREATOR FROM GROUPS WHERE G_ID = $1;",
      [groupId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Group not found");
    }
  } catch (err) {
    console.error("Error fetching group details:", err);
    res.status(500).send("Server error");
  }
});

app.get("/post/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await db.query(
      `SELECT C.C_ID, C.C_POSTER, C.P_CONTENT, C.C_DATE, P.P_TEXT
         FROM COMMENTS C
         JOIN POST P ON C.POST_ID = P.P_ID
         WHERE C.POST_ID = $1;`,
      [postId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).send("Server error");
  }
});

app.post("/post/:postId/comment", async (req, res) => {
  const { postId } = req.params;
  const { c_poster, p_content } = req.body;

  if (!c_poster) {
    return res.status(400).send("Missing logged-in profile ID");
  }

  try {
    const result = await db.query(
      `INSERT INTO COMMENTS (POST_ID, C_POSTER, P_CONTENT, C_DATE)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *;`,
      [postId, c_poster, p_content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).send("Server error");
  }
});

app.get("/post/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await db.query("SELECT * FROM POST WHERE P_ID = $1;", [
      postId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    console.error("Error fetching post details:", err);
    res.status(500).send("Server error");
  }
});

app.get("/groups/:groupId/members", async (req, res) => {
  const { groupId } = req.params;
  try {
    const result = await db.query(
      `SELECT P.P_ID, P.P_NAME, P.P_EMAIL, P.P_USERNAME 
         FROM GROUP_MEMBERS GM
         JOIN PROFILE P ON GM.P_ID = P.P_ID
         WHERE GM.G_ID = $1;`,
      [groupId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching group members:", err);
    res.status(500).send("Server error");
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
