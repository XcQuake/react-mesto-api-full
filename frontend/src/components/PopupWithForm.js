export default function PopupWithForm({name, title, isOpen, onClose, children, onSubmit}) {
  const popupClassName = `popup popup_type_${name} ${isOpen && 'popup_opened'}`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <button className="button popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`${name}`} noValidate onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  )
}