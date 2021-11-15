import React from 'react';
import MyInput from "./components/MyInput";
import MyButton from "./components/MyButton";
import CardsList from "./components/CardsList";
import Button from "@mui/material/Button";
import starYellow from './assets/staryellow.png';
import starBlack from './assets/starwhite.png';

function App(props) {
    let newWord = React.createRef();
    let newTranslate = React.createRef();

    // Добавление карточки в state
    function addCard() {
        if (newWord.current.value === '' || newTranslate.current.value === '') {
            alert('Заполните форму')
        } else {
            props.store.dispatch({type: 'ADD-CARD'});
            newWord.current.value = "";
            newTranslate.current.value = "";
        }
    }

    // Обновление state при каждом изменении input
    function updateInput(key, value) {
        props.store.dispatch({type: 'CHANGE-STATE', key, value});
    }

    function showStars() {
        props.store.dispatch({type: 'SHOW-STARS'});
    }

    function showAll() {
        props.store.dispatch({type: 'SHOW-ALL'});
    }

    function hideStars() {
        props.store.dispatch({type: 'HIDE-STARS'});
    }

    return (
        <div className="App">
            <div className="container">
                <div className="form">
                    <MyInput
                        inputRef={newWord}
                        label='Введите cлово'
                        onChange={(e) => updateInput('word', e.target.value)}
                    />
                    <br/><br/>
                    <MyInput
                        inputRef={newTranslate}
                        label='Введите перевод'
                        onChange={(e) => updateInput('translate', e.target.value)}
                    />
                    <br/><br/>
                    <MyButton onClick={addCard}>
                        Добавить
                    </MyButton>
                    <hr/>
                    <div className="form__display">
                        <Button size="medium" onClick={() => showAll()} variant="outlined">Показать все</Button>
                        <div>
                            <Button size="medium" onClick={() => showStars()} variant="outlined">
                                <img src={starYellow} alt=""/>
                            </Button>
                            <Button size="medium" onClick={() => hideStars()} variant="outlined">
                                <img src={starBlack} alt=""/>
                            </Button>
                        </div>
                    </div>
                </div>
                <CardsList state={props.state} store={props.store}/>
            </div>
        </div>
    );
}

export default App;
