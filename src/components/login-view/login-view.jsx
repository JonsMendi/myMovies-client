import React, { useState } from 'react';
import propTypes from 'prop-types';
import './login-view.scss'

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.toRegistrationView(username);
    };

    return (
        <div className='login-view'>
            <form>
                <div>
                    <label>
                        <h3>Username:</h3> <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        <h3>Password:</h3> <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
                <div>
                    <button type="submit" onClick={handleRegistration}>Register</button>
                </div>
            </form>
        </div>
    );
}
// propTypes - Give warnings in browser/console if data does not match with the required.
LoginView.propTypes = {
    onLoggedIn: propTypes.func.isRequired,
    toRegistrationView: propTypes.func//temporarily not required 
}