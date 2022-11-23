import React from "react";
import okIcon from '../image/RegistrationSuccessful.svg';
import failIcon from '../image/RegistrationFailed.png';

function InfoTooltip({ isOpen, onClose, successReg }) {
    return (
        <div className={`popup ${isOpen ? 'popup_active' : ''}`} >
            <div className="popup__window"
                onClick={(event) => { event.stopPropagation() }}>
                {successReg ? (<img src={okIcon} className='popup__status-reg' />) : (<img src={failIcon} className='popup__status-reg' />)}
                {successReg ? (<h2 className="popup__title popup__title-status">Вы успешно зарегистрировались!</h2>) :
                    (<h2 className="popup__title popup__title-status">Что-то пошло не так! Попробуйте ещё раз.</h2>)}
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