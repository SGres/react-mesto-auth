import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardDelete, onCardClick, cards, onCardLike }) {

    const currentUser = React.useContext(CurrentUserContext);
    const cardsElements = cards.map((item) => (
        <Card
            key={item._id}
            card={item}
            onClick={onCardClick}
            onCardLike={onCardLike}
            onDelCardClick={onCardDelete}
        />
    ));

    return (
        <main>
            <section className="profile">
                <button
                    className="profile__avatar"
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                    type="button"
                    onClick={onEditAvatar}
                />
                <div className="profile__info">
                    <div className="profile__div-name-edit">
                        <h1 className=" profile__name">{currentUser.name}</h1>
                        <button
                            type="button"
                            className="profile__edit-button"
                            onClick={onEditProfile}
                        />
                    </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                />
            </section>
            <section>
                <ul className="cards">
                    {cardsElements}
                </ul>
            </section>
        </main>
    );
}

export default Main;