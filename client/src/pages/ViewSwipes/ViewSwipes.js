import React, { Fragment , useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import LoggedInNavbar from '../../components/LoggedInNavbar/LoggedInNavbar'
import GameView from '../../components/GameView/GameView';
import './style.css'

export default () => {
    const history = useHistory();
    
    const [game, setGame] = useState({
        game: []
    })

    useEffect(()=>{
        document.title = 'iSwipe: View Games'
        const viewGames = async () => {
            try {
                const resp = await Axios({
                    method : 'GET',
                    url : 'api/iswipe/viewGames'
                });
                
                setGame({
                    game: resp.data,
                })

            } catch (e) {
                console.log(e)
            }
        }
        viewGames();
    }, []);

    return (
        <Fragment>
            <LoggedInNavbar />
            <div>
                <h2 style={{textAlign: 'center', margin: '40px'}}>View Games</h2>
            </div>
            <GameView game_arr={game.game}/>
        </Fragment>
    );
}