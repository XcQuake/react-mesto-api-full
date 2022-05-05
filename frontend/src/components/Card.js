import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner._id;
  const cardDeleteButtonClassName = (
    `button card__delete-button ${!isOwn && 'card__delete-button_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `button card__like-button ${isLiked && 'card__like-button_active'}`
  );

  return (
    <li className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} onClick={handleCardDelete} type="button" aria-label="Удалить"></button>
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}