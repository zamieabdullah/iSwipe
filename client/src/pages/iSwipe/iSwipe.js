import React, { Fragment , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoggedInNavbar from '../../components/LoggedInNavbar/LoggedInNavbar'
import './style.css';

export default () => {
    const history = useHistory();
    
    useEffect(()=>{
        document.title = 'iSwipe: Find Spots' 
    }, []);
    
    return (
        <Fragment>
            <LoggedInNavbar />
        </Fragment>
    );
}