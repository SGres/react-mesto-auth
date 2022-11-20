import React from "react";
import StatusImg from '../image/RegistrationSuccessful.svg'

function InfoTooltip() {
    // const popupClass = `popup popup_specific_${name} ${isOpen ? 'popup_active' : ''}`;

    return (
        <div className='popup popup_active'>
            <div className="popup__window"
                onClick={(event) => { event.stopPropagation() }}>
                <img
                    className='popup__status-reg'
                    src={StatusImg} />
                <h2 className="popup__title popup__title-status">Вы успешно зарегистрировались!</h2>
                <button
                    type="button"
                    className="popup__button-close"
                >
                </button>
            </div>
        </div >
    )
}

export default React.memo(InfoTooltip);