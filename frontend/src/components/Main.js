import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img className='profile__avatar-image' src={currentUser.avatar} alt='Аватар' />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button className="button profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
        </div>
        <button className="button profile__add-button" type="button" aria-label="Добавить фото" onClick={onAddPlace}></button>
      </section>
      <section className="gallery" aria-label="Галерея">
        <ul className='gallery__list'> 
          {cards.map((item) => <Card 
                                  key = {item._id} 
                                  card = {item} 
                                  onCardClick = {onCardClick} 
                                  onCardLike = {onCardLike} 
                                  onCardDelete = {onCardDelete} 
                                />)
          }
        </ul>
      </section>
    </main>
  )
}

