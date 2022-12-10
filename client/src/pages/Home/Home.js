import React, { Fragment , useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import LoggedInNavbar from '../../components/LoggedInNavbar/LoggedInNavbar'
import './style.css'

export default () => {
    const history = useHistory();
    
    useEffect(()=>{
        document.title = 'iSwipe: Home' 
    }, []);
   
    const addSpots = (event) => {
        event.preventDefault();
        history.push('/add');
        window.location.reload();
    }

    return (
        <Fragment>
            <LoggedInNavbar />
            <div className='centered'>
                <h2 style={{textAlign: 'center', margin: '40px'}}>What would you like to do?</h2>
                <ul>
                    <li>
                        <button className='btn btn-primary option'>View my iSwipe</button>
                    </li>
                    <li>
                        <button className='btn btn-primary option' onClick={addSpots}>Add to my iSwipe</button>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}