import {combineReducers, createStore} from "redux";
import cardsReducer from "./cards-reducer";

let reducers = combineReducers({
    cardsPage: cardsReducer,
})

let store = createStore(reducers);

export default store;