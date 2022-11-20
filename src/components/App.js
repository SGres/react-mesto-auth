import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ApiClass from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ConfirmationPopup from './ConfirmationPopup';

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isConfirmDelCard, setIsConfirmDelCard] = useState(null);
  const [isRequestingServer, setIsRequestingServer] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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
        setCards((state) => state.filter((c) => c._id !== card._id && c));
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
  }, []);

  useEffect(() => {
    if (
      isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isConfirmDelCard
    ) {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.addEventListener('keydown', handleEscClose);
      };
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
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
    Promise.all([ApiClass.getUser(), ApiClass.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardDelete={openConfirmPopup}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
        />
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
          name="open-card"
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
