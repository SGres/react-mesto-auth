import logo from '../image/logo.svg'
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ email, onLogout }) {
    return (
        <header className="header">
            <a href="#">
                <img className="logo" src={logo} alt="логотип сайта Место" />
            </a>

            <div className='login-status'>
                <Switch>
                    <Route path='/sign-up'>
                        <Link to='/sign-in' className='login-status__button'>Войти</Link>
                    </Route>
                    <Route path='/sign-in'>
                        <Link to='/sign-up' className='login-status__button'>Регистрация</Link>
                    </Route>
                    <Route path='/'>
                        <p className='login-status__email'>{email}</p>
                        <button className='login-status__button' onClick={onLogout}>Выйти</button>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;
