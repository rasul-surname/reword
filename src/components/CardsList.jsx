import React from 'react';
import startYellow from "../assets/staryellow.png";
import startWhite from "../assets/starwhite.png";
import close from "../assets/remove.png";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function CardsList(props) {
    // Переворачивание карточки
    function flipCard(id, e) {
        e.preventDefault();
        props.store.dispatch({type: 'FLIP-CARD', numberCard: id})
    }

    // Удаление карточки
    function deleteCard(id) {
        props.store.dispatch({type: 'DELETE-CARD', numberCard: id});
    }

    //Добавление звездочки
    function addStar(id, e) {
        e.stopPropagation();
        props.store.dispatch({type: 'ADD-STAR', numberCard: id});
    }

    return (
        <TransitionGroup className='cards'>
            {props.state.cardsPage.cards.map(card => {
                return (
                    <CSSTransition
                        key={card.id}
                        timeout={500}
                        classNames='card'
                    >
                        <div
                            className={'card' + (card.value.overturned ? '__overturned' : '')}
                            onClick={(e) => flipCard(card.id, e)}
                        >
                            <div
                                className='card__star'
                                onClick={(e) => addStar(card.id, e)}
                            >
                                {card.value.star ?
                                    <img className='star' onClick={(e) => addStar(card.id, e)} src={startYellow}
                                         alt=""/> :
                                    <img className='star' src={startWhite} alt=""/>}
                            </div>
                            {card.value.overturned ? card.value.translate : card.value.word}
                            <img className='card__delete' onClick={() => deleteCard(card.id)} src={close} alt=""/>
                        </div>
                    </CSSTransition>
                )
            })}
        </TransitionGroup>
    )
}

export default CardsList;