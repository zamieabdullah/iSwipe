import React, { Fragment , useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from '../pages/Home/Home';
import LoginSignUp from '../pages/LoginSignUp/LoginSignUp';
import ISwipe from '../pages/iSwipe/iSwipe';
import ViewSwipes from '../pages/ViewSwipes/ViewSwipes';

export default () => {
    const [authenticated, setAuthenticated] = useState({
        valid : localStorage.getItem('authenticated')
    });
    
    useEffect(() => {
        const checkUser = async () => {
            Axios.defaults.headers.common['x-auth-token']=localStorage.getItem('x-auth-token');
            try {
                Axios.get('/api/auth/checkUser')
                    .then((resp) => {
                    })
                    .catch((error) => {
                    })
                
            } catch (e) {
                localStorage.removeItem('x-auth-token');
                localStorage.setItem('x-auth-token', false);
                delete Axios.defaults.headers.common['x-auth-token'];
            }
        }
        checkUser();
    }, []);
    
    if (authenticated.valid === 'false') {
        return (
            <Switch>
                <Route exact path='/register'>
                    <LoginSignUp />
                </Route>
                <Route exact path='/'>
                    <LoginSignUp />
                </Route>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/add'>
                    <ISwipe />
                </Route>
                <Route exact path='/view'>
                    <ViewSwipes />
                </Route>
            </Switch>
        )
    }
    
    
}