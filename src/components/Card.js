import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onClick, onCardLike, onDelCardClick }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    function handleImageClick() {
        onClick(card);
    }

    function handlelikeClick() {
        onCardLike(card, isLiked);
    }

    function handleDeleteClick() {
        onDelCardClick(card);
    }

    return (
        <li className="card">
            <button
                type="button"
                className="card__block-foto"
                onClick={handleImageClick}>
                <img src={card.link}
                    alt={card.name}
                    className="card__foto" />
            </button>
            {isOwn &&
                <button
                    type="button"
                    className="card__del"
                    onClick={handleDeleteClick}
                >
                </button>}
            <div className="card__block">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-block">
                    <button
                        type="button"
                        className={`card__like ${isLiked ? 'card__like_active' : ''}`}
                        onClick={handlelikeClick}
                    >
                    </button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default React.memo(Card);