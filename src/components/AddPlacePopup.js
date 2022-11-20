import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { addPlaceInitialValues } from "../utils/helpers";
import useFormValidations from "../hoocks/useFormValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isRequesting }) {
    const {
        values, isErrors, errorMessages, handleValueChange, setValues, resetErrors
    } = useFormValidations(addPlaceInitialValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: values['input-place'],
            link: values['input-link']
        })
    }

    useEffect(() => {
        if (isOpen) {
            setValues({ 'input-place': '', 'input-link': '' });
            resetErrors();
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name='new-card'
            title='Добавить место'
            btnText='Добавить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form form__label">
                <input
                    id="input-place"
                    name="name"
                    type="text"
                    minLength="2"
                    maxLength="30"
                    value={values['input-place']}
                    onChange={handleValueChange}
                    required
                    placeholder="Название"
                    className={`popup__input ${isErrors['input-place'] ? 'form__input_type_error' : ''}`}
                />
                <span className={`form__input-error ${isErrors['input-place'] ? 'form__input-error_active' : ''}`}>
                    {errorMessages['input-place']}
                </span>
            </label>
            <label className="form form__label">
                <input
                    id="input-link"
                    name="link"
                    type="url"
                    required
                    placeholder="Ссылка на картинку"
                    className={`popup__input ${isErrors['input-link'] ? 'form__input_type_error' : ''}`}
                    onChange={handleValueChange}
                    value={values['input-link']}
                />
                <span className={`form__input-error ${isErrors['input-link'] ? 'form__input-error_active' : ''}`}>
                    {errorMessages['input-link']}
                </span>
            </label>
            <button
                type="submit"
                className={`popup__button-save ${Object.values(isErrors).some((item) => item) ? 'popup__button-save_disabled' : ''}`}
                disabled={Object.values(isErrors).some((item) => item)}
            >
                {isRequesting ? 'Добавление...' : 'Добавить'}
            </button>
        </PopupWithForm>
    )
}

export default React.memo(AddPlacePopup);