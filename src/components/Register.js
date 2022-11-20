import React from 'react';

function Register() {
    return (
        <>
            <h2 className='registration-page__title'>Регистрация</h2>
            <div className='registration-page__inputs'>
                <form
                    name='registration-page__form'
                >
                    <label
                        className="registration-page__label"
                    >
                        <input
                            className='registration-page__input'
                            id='registration-email'
                            type="text"
                            placeholder="Email"
                            minLength="2"
                            maxLength="200"
                        ></input>
                    </label>
                    <label
                        className="registration-page__label"
                    >
                        <input
                            className='registration-page__input'
                            id='registration-password'
                            type="text"
                            placeholder="Пароль"
                            minLength="2"
                            maxLength="200"
                        ></input>
                    </label>
                    <button
                        className='registration-page__button'
                    >Зарегистрироваться</button>
                </form>
            </div>
            <div
                className='registration-page__block-entry'
            >
                <p
                    className='registration-page__text'
                >Уже зарегистрированы?&nbsp;
                    <button
                        className='registration-page__button-enter'
                    >
                        Войти
                    </button>
                </p>
            </div>
        </>
    );
}

export default Register;