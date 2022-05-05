import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isDataLoad}) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });

    inputRef.current.value = '';
  }

  return (
    <PopupWithForm 
      title={'Обновить аватар'} 
      name={'avatar'} 
      buttonText={'Сохранить'} 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input 
          name="avatar" 
          ref={inputRef} 
          type="url" 
          className="popup__input popup__input_type_avatar-link" 
          id='avatar' 
          placeholder="Ссылка на аватар" 
          maxLength="250" 
          required 
        />
        <span className="popup__input-error avatar-error"></span>
      </label>
      <button className="button popup__confirm-button" type="submit">
        {isDataLoad ? 'Обновить...' : 'Обновить'}
      </button>
    </PopupWithForm>
  )
}