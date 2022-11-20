import React, { useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import useFormValidations from "../hoocks/useFormValidation";
import { editAvatarProfileInitialValues } from "../utils/helpers";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isRequesting }) {

    const {
        values, isErrors, errorMessages, handleValueChange, setValues, resetErrors
    } = useFormValidations(editAvatarProfileInitialValues);

    const avatarRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    };

    useEffect(() => {
        if (isOpen) {
            setValues({ 'input-avatar': '' });
            resetErrors();
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар?'
            btnText='Обновить?'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form form__label">
                <input
                    id="input-avatar"
                    name="link"
                    type="url"
                    required
                    placeholder="Ссылка на изображение"
                    className={`popup__input ${isErrors['input-avatar'] ? 'form__input_type_error' : ''}`}
                    ref={avatarRef}
                    onChange={handleValueChange}
                    value={values["input-avatar"]}
                />
                <span
                    className={`form__input-error ${isErrors['input-avatar'] ? 'form__input-error_active' : ''}`}
                >
                    {errorMessages['input-avatar']}
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
}

export default React.memo(EditAvatarPopup);
