import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ApiClass from '../utils/Api';
import ConfirmationPopup from './ConfirmationPopup';
import * as Auth from '../utils/Auth';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isConfirmDelCard, setIsConfirmDelCard] = useState(null);
  const [isRequestingServer, setIsRequestingServer] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [successReg, setSuccessReg] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const history = useHistory();

  const loginUser = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const handleLogin = (email, password) => {
    Auth.authorize(email, password)
      .then((res) => {
        if (res?.token) {
          localStorage.setItem('jwt', res.token);
          loginUser();
          setEmail(email);
          history.push('/mesto');
        }
      })
      .catch(err => {
        console.log(err);
        setSuccessReg(false);
        setIsTooltipPopupOpen(true);
      });
  };

  const handleRegister = (email, password) => {
    Auth.register(email, password)

      .then((res) => {
        if (res.data) {
          setSuccessReg(true);
          setIsTooltipPopupOpen(true);
          history.push('/sign-in');
        } else {
          setSuccessReg(false);
          setIsTooltipPopupOpen(true);
        }
      })
      .catch(err => {
        console.log(err);
        setSuccessReg(false);
        setIsTooltipPopupOpen(true);
      });
  };

  const loginOutUser = useCallback(() => {
    setLoggedIn(false);
  }, []);

  const handleLoginOut = () => {
    localStorage.removeItem('jwt');
    loginOutUser();
    history.push('/sign-in');
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.checkToken(jwt).then((res) => {
        if (res) {
          setEmail(res.data.email);
          loginUser();
          history.push('/mesto');
        }
      });
    }
  }, []);

  const closeConfirmPopup = useCallback(() => {
    setIsConfirmDelCard(null);
  }, []);

  const openConfirmPopup = useCallback((card) => {
    setIsConfirmDelCard(card);
  }, []);

  const handleCardLike = useCallback((card, isLiked) => {
    ApiClass
      .toggleLike(card._id, isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
      })
      .catch((err) => console.log(`Ошибка снятия лайка handleCardLike: ${err}`));
  }, [])

  const handleCardDelete = useCallback((card) => {
    setIsRequestingServer(true);
    ApiClass
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeConfirmPopup();
      })
      .catch((err) => console.log(`Ошибка удаления карточки handleCardDelete: ${err}`))
      .finally(() => {
        setIsRequestingServer(false);
      })
  }, []);

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setIsEditAvatarPopupOpen(true);
  }, [])

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true);
  }, []);

  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true);
  }, []);

  const closeAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsTooltipPopupOpen(false);
  }, []);

  useEffect(() => {
    if (
      isTooltipPopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isConfirmDelCard
    ) {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }
  }, [
    isTooltipPopupOpen,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
    isConfirmDelCard,
  ]);

  const handleUpdateUser = useCallback((data) => {
    setIsRequestingServer(true);
    console.dir(data);
    ApiClass
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsRequestingServer(false);
      });
  }, []);

  const handleUpdateAvatar = useCallback((data) => {
    setIsRequestingServer(true);
    ApiClass
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsRequestingServer(false);
      });
  }, []);

  const handleAddPlaceSubmit = useCallback((data) => {
    setIsRequestingServer(true);
    ApiClass
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsRequestingServer(false);
      });
  }, [cards]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([ApiClass.getUser(), ApiClass.getCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    };
  }, [loggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          onLogout={handleLoginOut} />
        <Switch>
          <Route exact path='/sign-up'>
            <Register onRegister={handleRegister}
            />
          </Route>
          <Route exact path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/mesto"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardDelete={openConfirmPopup}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
          />
          <Route path='/'>
            {loggedIn ? <Redirect to="/mesto" /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRequesting={isRequestingServer}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isRequesting={isRequestingServer}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRequesting={isRequestingServer}
        />
        <ConfirmationPopup
          card={isConfirmDelCard}
          onSubmit={handleCardDelete}
          onClose={closeConfirmPopup}
          isRequesting={isRequestingServer}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          successReg={successReg}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
