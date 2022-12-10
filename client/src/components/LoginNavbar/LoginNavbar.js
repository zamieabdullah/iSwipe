import React, { Fragment , useState } from 'react';
import Axios from 'axios';
import PopUp from "../PopUp/PopUp";
import { useHistory } from 'react-router-dom';
import './style.css';
import "../PopUp/style.css";

export default () => {
    const history = useHistory();
    
    const [user, setUser] = useState({
        email : '',
        password : ''
    });
    
    const [seen, setSeen] = useState({
        seen: false
    });
    
    const togglePop = () => {
        setSeen({seen: !seen.seen});
    };
    
    const [message, setMessage] = useState({
        message: ''
    });
    
    const addMessage = (newMessage) => {
        setMessage({message: newMessage});
    };
    
    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const resp = await Axios({
                method : 'POST',
                url : '/api/auth/loginUser',
                headers : {'Content-Type' : 'application/json'},
                data : {
                    email : user.email,
                    password : user.password
                }
            });
            
            setUser({
                email : '',
                password : ''
            });

            localStorage.setItem('x-auth-token', resp.data.token);
            
            localStorage.setItem('authenticated', resp.data.auth);
            
            history.push('/');
            window.location.reload();
        } catch (err) {
            togglePop();
            addMessage('Error has occurred when logging in.');
        }
    }

    return (
        <Fragment>
            <nav class='navbar justify-content-between'>
                <h1>iSwipe</h1>
                <form className='form-inline' onSubmit={handleSubmit}>
                    <div className='form-group mr-2'>
                        <input className='form-control' type='text'
                            name='email' value={user.email}
                            onChange={handleChange}
                            placeholder='Email Address' required/>
                    </div>
                    <div className='form-group mr-2'>
                        <input className='form-control' type='text'
                            name='password' value={user.password}
                            onChange={handleChange}
                            placeholder='Password' required/>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </nav>
            {seen.seen ? <PopUp toggle={togglePop} message={message.message}/> : null}
        </Fragment>
    )
}