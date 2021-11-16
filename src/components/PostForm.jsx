import React, {useState} from 'react';
import MyInput from "./ui/input/MyInput";
import MyButton from "./ui/button/MyButton";
import {addCardAC, changeStateAC} from "../redux/cards-reducer";

const PostForm = ({store}) => {
    let [card, setCard] = useState({word: '', translate: ''});

    // Добавление карточки в state
    function addCard() {
        if (card.word === '' || card.translate === '') {
            alert('Заполните форму');
        } else {
            store.dispatch(addCardAC());
            setCard({word: '', translate: ''});
        }
    }

    // Обновление state при каждом изменении input
    function updateInput(key, value) {
        if(key === 'word') {
            setCard({...card, word: value});
        } else {
            setCard({...card, translate: value});
        }
        store.dispatch(changeStateAC(key, value));
    }

    return (
        <form>
            <MyInput
                value={card.word}
                label='Введите cлово'
                onChange={(e) => updateInput('word', e.target.value)}
            />
            <br/><br/>
            <MyInput
                value={card.translate}
                label='Введите перевод'
                onChange={(e) => updateInput('translate', e.target.value)}
            />
            <br/><br/>
            <MyButton onClick={addCard}>
                Добавить
            </MyButton>
        </form>
    );
};

export default PostForm;