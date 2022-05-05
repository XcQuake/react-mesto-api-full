import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useValidation } from '../hooks/useValidation';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isDataLoad}) {
  const currentUser = useContext(CurrentUserContext);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDesctiption(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    })
  }

  function handleOnBlur() {
    setIsTouched(true)
  }

  // Валидация форм
  const nameValid = useValidation(name, {minLength: 2, isEmpty: true});
  const descriptionValid = useValidation(description, {minLength: 2, isEmpty: true});
  const buttonClassName = `button popup__confirm-button ${(!nameValid.validity || !descriptionValid.validity) && 'button_inactive'}`

  return (
    <PopupWithForm 
        title = {'Редактировать профиль'} 
        name = {'profile'} 
        isOpen = {isOpen}
        onClose = {onClose}
        onSubmit = {handleSubmit}
    >
      <label className="popup__field">
        <input 
          name="name" 
          type="text" 
          value={name || ''} 
          onChange={handleChangeName} 
          onBlur={handleOnBlur}
          className="popup__input popup__input_type_name" 
          id="name" 
          placeholder="Имя" 
          minLength="2" 
          maxLength="40" 
          required 
        />
        {(isTouched && nameValid.minLengthError) && <span className="input-error">{nameValid.errorMessage}</span>}
      </label>
      <label className="popup__field">
        <input 
          name="about" 
          type="text" 
          value={description || ''} 
          onChange={handleChangeDesctiption}
          onBlur={handleOnBlur}
          className="popup__input popup__input_type_about" 
          id="about" 
          placeholder="О себе" 
          minLength="2" 
          maxLength="200" 
          required 
        />
        {(isTouched && descriptionValid.minLengthError) && <span className="input-error">{descriptionValid.errorMessage}</span>}
      </label>
      <button className={buttonClassName} disabled={!nameValid.validity || !descriptionValid.validity} type="submit">
        {isDataLoad ? 'Сохранить...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  )
}