const express = require('express');
const router = express.Router();

// Middleware проверки авторизации
const requireAuth = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

// Личный кабинет
router.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// Страница профиля
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('profile', { user });
});

module.exports = router;
