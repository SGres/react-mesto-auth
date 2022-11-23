import React from "react";
import okIcon from '../image/RegistrationSuccessful.svg';
import failIcon from '../image/RegistrationFailed.png';

function InfoTooltip({ isOpen, onClose, successReg }) {
    const icon = successReg ? okIcon : failIcon;
    const message = successReg ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
    return (
        <div className={`popup ${isOpen ? 'popup_active' : ''}`} >
            <div className="popup__window"
                onClick={(event) => { event.stopPropagation() }}>
                <img src={icon} className='popup__status-reg' />
                <h2 className="popup__title popup__title-status">{message}</h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="popup__button-close"
                >
                </button>
            </div>
        </div >
    )
}

export default React.memo(InfoTooltip);