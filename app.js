const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/socpublic', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Сессии
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 час
}));

// Роуты
app.use('/', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
