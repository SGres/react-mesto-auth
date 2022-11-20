import React from "react";

function PopupWithForm({ isOpen, title, name, children, onClose, onSubmit }) {
    const popupClass = `popup ${isOpen ? 'popup_active' : ''}`;

    return (
        <div className={popupClass} onClick={onClose}>
            <div className="popup__window"
                onClick={(event) => { event.stopPropagation() }}>
                <h2 className="popup__title">{title}</h2>
                <form
                    name={`popup__form_${name}`}
                    onSubmit={onSubmit}
                    className="form popup__form"
                    noValidate>
                    {children}
                </form>
                <button
                    type="button"
                    className="popup__button-close"
                    onClick={onClose}>
                </button>
            </div>
        </div >
    )
}

export default React.memo(PopupWithForm);