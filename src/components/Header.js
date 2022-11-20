import logo from '../image/logo.svg'

function Header() {
    return (
        <header className="header">
            <a href="#">
                <img className="logo" src={logo} alt="логотип сайта Место" />
            </a>
            <div className='login-status'>
                <p className='login-status__email'>sashka0118@gmail.com</p>
                <button className='login-status__button'>Выйти</button>
            </div>
        </header>
    );
}

export default Header;
