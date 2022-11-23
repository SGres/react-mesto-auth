import React, { useState } from 'react';

function Login({ onLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            return;
        }
        onLogin(email, password);
    };
    return (
        <>
            <h2 className='registration-page__title'>Вход</h2>
            <div className='registration-page__inputs'>
                <form
                    name='registration-page__form'
                    onSubmit={handleSubmit}
                >
                    <label
                        className="registration-page__label"
                    >
                        <input
                            onChange={handleChangeEmail}
                            value={email}
                            name='email'
                            type="email"
                            id='email'
                            className='registration-page__input'
                            placeholder="Email"
                            minLength="2"
                            maxLength="200"
                        ></input>
                    </label>
                    <label
                        className="registration-page__label"
                    >
                        <input
                            onChange={handleChangePassword}
                            value={password}
                            type='password'
                            name='password'
                            id='password'
                            placeholder="Пароль"
                            className='registration-page__input'
                            minLength="2"
                            maxLength="200"
                        ></input>
                    </label>
                    <button
                        className='registration-page__button'
                        type='submit'
                    >
                        Войти</button>
                </form>
            </div>
        </>
    );
}

export default Login;