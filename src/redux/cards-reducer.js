const CHANGE_STATE = 'CHANGE-STATE';
const ADD_CARD = 'ADD-CARD';
const FLIP_CARD = 'FLIP-CARD';
const DELETE_CARD = 'DELETE-CARD';
const ADD_STAR = 'ADD-STAR';
const SHOW_STARS = 'SHOW-STARS';
const SHOW_ALL = 'SHOW-ALL';
const HIDE_STARS = 'HIDE-STARS';

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
        case CHANGE_STATE:
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
        case ADD_CARD:
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
        case FLIP_CARD:
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
        case DELETE_CARD:
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
        case ADD_STAR:
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
        case SHOW_STARS:
            return {
                ...state,
                cardsAll: state.cardsAll,
                cards: state.cardsAll.filter(card => {
                    if (card.value.star) {
                        return card;
                    }
                })
            }
        case SHOW_ALL:
            return {
                ...state,
                cardsAll: state.cardsAll,
                cards: state.cardsAll,
            }
        case HIDE_STARS:
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

export const addCardAC = () => ({type: ADD_CARD})
export const changeStateAC = (key, value) => ({type: CHANGE_STATE, key, value})
export const showStarsAC = () => ({type: SHOW_STARS})
export const showAllAC = () => ({type: SHOW_ALL})
export const hideStarsAC = () => ({type: HIDE_STARS})
export const flipCardAC = (id) => ({type: FLIP_CARD, numberCard: id})
export const deleteCardAC = (id) => ({type: DELETE_CARD, numberCard: id})
export const addStarAC = (id) => ({type: ADD_STAR, numberCard: id})

export default cardsReducer;