import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register({ onRegister }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            return;
        }
        onRegister(email, password);
    };

    return (
        <>
            <h2 className='registration-page__title'>Регистрация</h2>
            <div className='registration-page__inputs'>
                <form
                    onSubmit={handleSubmit}
                    name='registration-page__form'
                >
                    <label
                        className="registration-page__label"
                    >
                        <input
                            className='registration-page__input'
                            id='registration-email'
                            placeholder="Email"
                            minLength="2"
                            maxLength="200"
                            value={email}
                            onChange={handleChangeEmail}
                            autoComplete='off'
                            type='email'
                            required
                        ></input>
                    </label>
                    <label
                        className="registration-page__label"
                    >
                        <input
                            type='password'
                            value={password}
                            onChange={handleChangePassword}
                            autoComplete='off'
                            className='registration-page__input'
                            id='registration-password'
                            placeholder="Пароль"
                            minLength="2"
                            maxLength="200"
                            required
                        ></input>
                    </label>
                    <button
                        className='registration-page__button'
                        type='submit'
                    >Зарегистрироваться</button>
                </form>
            </div>
            <div
                className='registration-page__block-entry'
            >
                <p
                    className='registration-page__text'
                >Уже зарегистрированы?&nbsp;
                    <Link
                        to='/sign-in'
                        className='registration-page__button-enter'
                    >
                        Войти
                    </Link>
                </p>
            </div>
        </>
    );
}

export default withRouter(Register);