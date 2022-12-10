import React, { Fragment , useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import './style.css';

export default () => {
    
    const history = useHistory();
    
    const [user, setUser] = useState({
        first_name : '',
        last_name : '',
        email_address : '',
    });
    
    const logOut = () => {
        localStorage.removeItem('x-auth-token');
        localStorage.setItem('authenticated', false);
        delete Axios.defaults.headers.common['x-auth-token'];
        
        history.push('/register');
        window.location.reload();
    }
    
    useEffect(() => {
        const getUser = async () => {
            try {
                Axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('x-auth-token');
                const resp = await Axios({
                    method : 'GET',
                    url : 'api/user/getUser'
                });
                
                setUser({
                    first_name : resp.data.first_name,
                    last_name : resp.data.last_name,
                    email_address : resp.data.email
                });
                
            } catch (e) {
                logOut();
            }
        }
        getUser();
    }, []);
    
    return (
        <Fragment>
            <nav class='navbar justify-content-between'>
                <h1>iSwipe</h1>
                <h2>{user.first_name}'s iSwipe</h2>
                <button className='btn btn-primary' onClick={logOut}>Log Out</button>
            </nav>
        </Fragment>
    )
}