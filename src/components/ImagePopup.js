import React from "react";

function ImagePopup({ name, card, isOpen, onClose }) {

    React.useEffect(() => {
        const handleEscClose = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscClose);
        } else {
            document.removeEventListener('keydown', handleEscClose)
        }
    }, [isOpen])

    return (
        <>
            <section
                className={`popup ${card ? 'popup_active' : ''}`}
                onClick={onClose}>
                <div className="popup__window-foto"
                    onClick={(event) => { event.stopPropagation() }}>
                    <img
                        src={card ? card.link : ''}
                        alt={card ? card.name : ''}
                        className="popup__open-photo" />
                    <button
                        type="button"
                        className="popup__button-close popup__button-close-foto"
                        onClick={onClose}
                    >
                    </button>
                    <h2 className="popup__foto-title">{card ? card.name : ''}</h2>
                </div>
            </section>
        </>
    );
}

export default React.memo(ImagePopup);




