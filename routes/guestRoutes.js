const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middleware/auth');

// Controllers
const blogsControler = require('../controller/blogsControler');
const usersControler = require('../controller/usersControler');

// Routes
router.post('/login', usersControler.login);
router.post('/register', usersControler.registerGuest);
// router.post('/refreshToken', authenticateJWT, usersControler.refreshToken);
// router.get('/blogs', authenticateJWT, blogsControler.getBlogs);
// router.patch('/likeBlog/:id', authenticateJWT, blogsControler.likeBlog);

module.exports = router;

