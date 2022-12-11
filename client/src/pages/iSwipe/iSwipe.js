import React, { Fragment , useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import LoggedInNavbar from '../../components/LoggedInNavbar/LoggedInNavbar'
import ISwipe from '../../components/iSwipe/iSwipe';
import './style.css';

export default (props) => {
    const history = useHistory();

    const [loading, setLoading] = useState({
        loading: true,
    })
    
    const [game, setGame] = useState({
        game: null,
    })

    const goHome = (event) => {
        event.preventDefault();
        history.push('/');
        window.location.reload();
    }
    useEffect(()=>{
        document.title = 'iSwipe: Find Free Games';
        const getGames = async () => {
            try {
                const resp = await Axios({
                    method : 'GET',
                    url : 'api/iswipe/getGames'
                });
                
                setGame({
                    game: resp.data
                })

                setLoading({
                    loading: false
                })

            } catch (e) {
                console.log(e)
            }
        }
        getGames();
    }, []);
    
    return (
        <Fragment>
            <LoggedInNavbar />
            {loading.loading ? null : <ISwipe game_arr={game.game}/>}
            <button className='position-absolute bottom-0 end-50 btn btn-primary' onClick={goHome}>Return to Home</button>
        </Fragment>
    );
}