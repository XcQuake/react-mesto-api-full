import {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {useValidation} from '../hooks/useValidation'

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isDataLoad}) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  function handleAddTitle(e) {
    setTitle(e.target.value);
  }

  function handleAddLink(e) {
    setLink(e.target.value);
  }

  function handleOnBlur() {
    setIsTouched(true)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: title,
      link: link
    });
  }

  // Очищение формы при открытии
  useEffect(() => {
    setTitle('');
    setLink('');
    setIsTouched(false);
  }, [isOpen])

  // Валидация форм
  const linkValid = useValidation(link, {isEmpty: true, isUrl: true});
  const titleValid = useValidation(title, {minLength: 2, isEmpty: true});
  const buttonClassName = `button popup__confirm-button ${(!linkValid.validity || !titleValid.validity) && 'button_inactive'}`

  return (
    <PopupWithForm 
      title={'Новое место'} 
      name={'card'} 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input 
          name="name" 
          type="text" 
          value={title} 
          onChange={handleAddTitle}
          onBlur={handleOnBlur}
          className="popup__input popup__input_type_name" 
          id="title" 
          placeholder="Название" 
          minLength="2" 
          maxLength="30" 
          required 
        />
        {(isTouched && !titleValid.validity) && <span className="input-error">{titleValid.errorMessage}</span>}
      </label>
      <label className="popup__field">
        <input 
          name="link" 
          type="url" 
          value={link} 
          onChange={handleAddLink}
          onBlur={handleOnBlur}
          className="popup__input popup__input_type_link" 
          id="link" 
          placeholder="Ссылка на картинку"
          maxLength="250" 
          required 
        />
        {(isTouched && !linkValid.validity) && <span className="input-error">{linkValid.errorMessage}</span>}
      </label>
      <button className={buttonClassName} disabled={!linkValid.validity || !titleValid.validity} type="submit">
        {isDataLoad ? 'Создать...' : 'Создать'}
      </button>
    </PopupWithForm>
  )
}
