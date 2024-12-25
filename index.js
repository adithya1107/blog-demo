const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const blogs = require('./api/blogsData.json');
const port = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'public'))); // 'public' is where your frontend build files are located

// API Endpoints
app.get('/blogs', (req, res) => {
  res.send(blogs);
});

app.get('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blog = blogs.filter((b) => b.id === id);
  res.send(blog);
});

// Catch-all route to serve the frontend's index.html for unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});