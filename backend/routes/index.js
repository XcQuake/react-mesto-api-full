const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { signinValidation, signupValidation } = require('../middlewares/validation');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

router.use(auth);

router.get('/signout', logout);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use(() => { throw new NotFoundError('Ресурс по указанному адресу не найден'); });

module.exports = router;
