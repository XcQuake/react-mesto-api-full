const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  putLikeValidation,
  deleteLikeValidation,
  deleteCardValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', deleteCardValidation, deleteCard);
router.put('/:cardId/likes', putLikeValidation, likeCard);
router.delete('/:cardId/likes', deleteLikeValidation, dislikeCard);

module.exports = router;
