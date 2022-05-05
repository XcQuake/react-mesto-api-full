import PopupWithForm from './PopupWithForm';

export default function DeleteCardPopup({card, isOpen, onClose, onDeleteCard, isDataLoad}) {
  function handleDeleteCard(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm 
      title={'Вы уверены?'} 
      name={'confirm'} 
      buttonText={'Да'} 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleDeleteCard}
    >
    <button className="button popup__confirm-button" type="submit">
      {isDataLoad ? 'Удалить...' : 'Удалить'}
    </button>
    </PopupWithForm>
  )
}