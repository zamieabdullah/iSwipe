import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

export default () => {
    const history = useHistory();

    const goAdd = (event) => {
        event.preventDefault();
        history.push('/add');
        window.location.reload();
    }

    return (
        <div className='container'>
            <p>It seems no free games caught your eye. Take a look for anything interesing.</p>
            <p>
                If you would like to see more free games, press the button below.
            </p>
            <button className='btn btn-primary' onClick={goAdd}>
                Find new free games
            </button>
        </div>
    )

}