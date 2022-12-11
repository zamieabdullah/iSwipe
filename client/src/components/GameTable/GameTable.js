import React from 'react';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import GameRow from '../GameRow/GameRow';
import './style.css';

export default (props) => {
    const history = useHistory();
    const rows = []

    for (let i = 0; i < props.game_arr.length; i++) {
        rows.push(<GameRow game={props.game_arr[i]}/>);
    }

    const goRecord = (event) => {
        event.preventDefault();
        history.push('/add');
        window.location.reload();
    }

    return (
        <div className='container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Game Title</th>
                        <th>Game Genre</th>
                        <th>Short Description</th>
                        <th>Game Link</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
            <div className='container'>
                <button className='btn btn-primary' onClick={goRecord}>
                    Find more games
                </button>
            </div>
        </div>
    )
}