export default function InfoTooltip({isOpen, onClose, isAuthSuccess, successText, failText}) {
  const popupClassName = (`popup popup_type_signup-status ${isOpen && 'popup_opened'}`);
  const imageClassName = (
    `popup__tooltip-image ${isAuthSuccess ? 'popup__tooltip-image_type_success' : 'popup__tooltip-image_type_fail' }`
  );
  
  function handleClose() {
    if (isAuthSuccess) {
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <div className={popupClassName} >
      <div className="popup__container">
        <div className='popup__tooltip'>
          <button className="button popup__close-button" type="button" aria-label="Закрыть" onClick={handleClose}></button>
          <div className={imageClassName}></div>
          <p className="popup__tooltip-text">{isAuthSuccess ? successText : failText}</p>
        </div>
      </div>
    </div>
  )
}