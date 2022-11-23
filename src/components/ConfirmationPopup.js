import React, { useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ card, onSubmit, onClose, isRequesting }) {

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(card);
    }

    return (
        <PopupWithForm
            name='deletions'
            title='Удалить карточку?'
            isOpen={!!card}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <button
                type="submit"
                className='popup__button-save'
            >
                {isRequesting ? 'Удаление...' : 'Да'}
            </button>
        </PopupWithForm>
    )
}

export default React.memo(ConfirmationPopup);