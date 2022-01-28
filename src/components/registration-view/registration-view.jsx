import React, { useState } from 'react';
import propTypes from 'prop-types';
import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birth, setBirth ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(username, password, email, birth)
    };

    return (
        <div className='registration-view'>
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
                <label>
                    <h3>Email:</h3> <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    <h3>Birth:</h3> <input type="text" value={birth} onChange={e => setBirth(e.target.value)} />
                </label>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    )
}
// propTypes - Give warnings in browser/console if data does not match with the required.
RegistrationView.propTypes = {
    onRegister: propTypes.func//temporarily not required 
}