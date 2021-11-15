let initialState = {
    id: 0,
    word: '',
    translate: '',
    overturned: false,
    star: false,
    cards: [],
    cardsAll: [],
}

let cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE-STATE':
            if (action.key == "word") {
                return {
                    ...state,
                    word: action.value,
                }
            } else {
                return {
                    ...state,
                    translate: action.value,
                }
            }
        case 'ADD-CARD':
            const newCard = {
                id: 1 + state.id,
                value: {
                    word: state.word,
                    translate: state.translate,
                    overturned: false,
                    star: false,
                }
            }
            return {
                ...state,
                id: newCard.id,
                word: '',
                translate: '',
                cards: [...state.cards, newCard],
                cardsStars: state.cards.filter(card => {
                    return card.star === true;
                }),
                cardsAll: [...state.cards, newCard],
            }
        case 'FLIP-CARD':
            const cards = [...state.cards];
            let index = cards.findIndex(card => {
                return card.id === action.numberCard;
            });
            if (cards[index] === undefined) {
                return {
                    ...state,
                    cards: cards
                }
            } else {
                cards[index].value.overturned = !cards[index].value.overturned;
                return {
                    ...state,
                    cards: cards,
                }
            }
        case 'DELETE-CARD':
            const stateCards = [...state.cards];
            let indexCard = stateCards.findIndex(card => {
                return card.id === action.numberCard;
            });
            let flag = state.cards.splice(indexCard, 1);
            return {
                ...state,
                cards: state.cards.filter(card => {
                    if (card !== flag) {
                        return true;
                    }
                }),
                cardsAll: state.cards,
            }
        case 'ADD-STAR':
            const cardsStar = [...state.cards];
            let indexStar = cardsStar.findIndex(card => {
                return card.id === action.numberCard;
            });

            if (cardsStar[indexStar] === undefined) {
                return {
                    ...state,
                    cards: cardsStar
                }
            } else {
                cardsStar[indexStar].value.star = !cardsStar[indexStar].value.star;
                return {
                    ...state,
                    cardsAll: state.cards,
                    cards: cardsStar
                }
            }
        case 'SHOW-STARS':
            return {
                ...state,
                cardsAll: state.cardsAll,
                cards: state.cardsAll.filter(card => {
                    if (card.value.star) {
                        return card;
                    }
                })
            }
        case 'SHOW-ALL':
            return {
                ...state,
                cardsAll: state.cardsAll,
                cards: state.cardsAll,
            }
        case 'HIDE-STARS':
            return {
                ...state,
                cardsAll: state.cardsAll,
                cards: state.cardsAll.filter(card => {
                    if (card.value.star === false) {
                        return card;
                    }
                })
            }
        default:
            return state;
    }
}

export default cardsReducer;