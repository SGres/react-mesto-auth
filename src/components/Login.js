import React from 'react';

function Login() {
    return (
        <>
            <h2 className='registration-page__title'>Вход</h2>
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
                    >
                        Войти</button>
                </form>
            </div>
        </>
    );
}

export default Login;