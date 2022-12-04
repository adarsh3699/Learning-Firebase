import React from 'react';
import './App.css';

import { getRealTimeData, handleSignUpForm, handleLoginForm, handleSignOut } from './Firebase/Auth/Learning';

function LoginPage() {
    getRealTimeData();
    return (
        <div className="App">
            <h1>Login Page</h1>
            <form onSubmit={handleLoginForm}>
                <input type="email" name="email" placeholder="email" required />
                <br />
                <input type="password" name="password" placeholder="Password" required />
                <br />
                <button>Login</button>
            </form>
            <br />

            <form onSubmit={handleSignUpForm}>
                <input type="email" name="email" placeholder="email" required />
                <br />
                <input type="password" name="password" placeholder="Password" required />
                <br />
                {/* <input type="password" name='confirmPassword' placeholder="Confirm Password" required /> */}
                <br />
                <button>Sign Up</button>
            </form>
            <br />
            <br />
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default LoginPage;
