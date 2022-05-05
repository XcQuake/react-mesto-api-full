export default function ImagePopup({card, isOpen, onClose}) {
  const popupClassName = (`popup popup_type_image ${isOpen && 'popup_opened'}`);

  return (
    <div className={popupClassName} >
      <div className="popup__image-container">
        <button className="button popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image"/>
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}