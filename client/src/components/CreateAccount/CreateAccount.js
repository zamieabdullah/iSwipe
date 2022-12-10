import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import PopUp from "../PopUp/PopUp";
import "./style.css";
import "../PopUp/style.css";

export default () => {
    const history = useHistory();

    const [account, setAccount] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const [seen, setSeen] = useState({
        seen: false
    });

    const [message, setMessage] = useState({
        message: ''
    });

    const togglePop = () => {
        setSeen({seen: !seen.seen});
    };

    const addMessage = (newMessage) => {
        setMessage({message: newMessage});
    };

    const handleChange = (event) => {
        setAccount({...account, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const resp = await Axios({
                method: 'POST',
                url: '/api/auth/createUser',
                headers: {'Content-Type' : 'application/json'},
                data: {
                    first_name: account.first_name,
                    middle_name: account.middle_name,
                    last_name: account.last_name,
                    email: account.email,
                    password: account.password
                }
            });

            setAccount({
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            });

            localStorage.setItem('x-auth-token', resp.data.token);
            localStorage.setItem('authenticated', resp.data.auth);

            history.push('/');
            window.location.reload();
        } catch (error) {
            togglePop();
            addMessage('Error has occurred when making account');
        }
    };

    const showPass = (event) => {
        event.preventDefault();
        const pass = document.getElementById("psw");

        if (pass.type === "password") {
            pass.type = "text";
        } else if (pass.type === "text") {
            pass.type = "password";
        }
    }

    return (
        <Fragment>
            <h2 className="text-center mt-5">Create account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <label htmlFor="first_name" className="required">First Name</label>
                    <input type="text" className="form-control"
                        placeholder="First Name" name="first_name"
                        value={account.first_name}
                        onChange={handleChange} required/>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="last_name" className="required">Last Name</label>
                    <input type="text" className="form-control"
                        placeholder="Last Name" name="last_name"
                        value={account.last_name}
                        onChange={handleChange} required/>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="email_address" className="required">Email Address</label>
                    <input type="text" className="form-control"
                        placeholder="Email Address" name="email"
                        value={account.email}
                        onChange={handleChange} required/>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="required">Password</label>
                    <input type="password" className="form-control"
                        id="psw" placeholder="Password" name="password"
                        value={account.password}
                        onChange={handleChange} required/>
                </div>
                <div className="form-group mb-4">
                    <input type="checkbox" onClick={showPass}/> Show Password
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            {seen.seen ? <PopUp toggle={togglePop} message={message.message}/> : null}

        </Fragment>
    )
}