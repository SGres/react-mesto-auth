
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidations from "../hoocks/useFormValidation";
import { editProfileInitialValues } from "../utils/helpers";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isRequesting }) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, isErrors, errorMessages, handleValueChange, setValues, resetErrors } = useFormValidations(editProfileInitialValues);

    React.useEffect(() => {
        if (currentUser.name && currentUser.about && isOpen) {
            setValues({ 'input-name': currentUser.name, 'input-about': currentUser.about });
            resetErrors();
        }
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: values['input-name'],
            about: values['input-about'],
        });
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            btnText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__label">
                <input
                    className={`popup__input ${isErrors['input-name'] ? 'form__input_type_error' : ''}`}
                    name="inputName"
                    id="input-name"
                    type="text"
                    placeholder="Имя"
                    value={values["input-name"]}
                    onChange={handleValueChange}
                    minLength="2"
                    maxLength="40"
                    required
                />
                <span
                    className={`form__input-error ${isErrors['input-name'] ? 'form__input-error_active' : ''}`}
                >
                    {errorMessages["input-name"]}
                </span>
            </label>
            <label className="form form__label">
                <input
                    className={`popup__input ${isErrors['input-about'] ? 'form__input_type_error' : ''}`}
                    name="inputAbout"
                    id='input-about'
                    type="text"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    value={values['input-about']}
                    onChange={handleValueChange}
                    required
                />
                <span
                    className={`form__input-error ${isErrors['input-about'] ? 'form__input-error_active' : ''}`}
                >
                    {errorMessages['input-about']}
                </span>
            </label>
            <button
                type="submit"
                className={`popup__button-save ${Object.values(isErrors).some((item) => item) ? 'popup__button-save_disabled' : ''}`}
                disabled={Object.values(isErrors).some((item) => item)}
            >
                {isRequesting ? 'Сохранение...' : 'Сохранить'}
            </button>
        </PopupWithForm>
    )
};

export default React.memo(EditProfilePopup);

