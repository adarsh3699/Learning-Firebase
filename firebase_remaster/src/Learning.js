import React from 'react';
import './App.css';

import { getData, getRealTimeData, addData, deleteData, getDocument, updateDocument } from './Firebase/Auth/Learning';

function LoginPage() {
    getRealTimeData();
    return (
        <div className="App">
            <br />
            <h2>Add doc</h2>
            <form onSubmit={addData}>
                <input type="text" name="name" minLength={3} placeholder="Name" required />
                <br />
                <input type="number" name="roll" placeholder="Roll" required />
                <br />
                <button>Submit</button>
            </form>
            <br />
            <h2>Remove doc</h2>
            <form onSubmit={deleteData}>
                <input type="text" name="id" placeholder="ID" required />
                <br />
                <button>Delete</button>
            </form>
            <br />
            <h2>Get single Doc</h2>
            <form onSubmit={getDocument}>
                <input type="text" name="id" placeholder="ID" required /> <br />
                <button>Submit</button>
            </form>

            <h2>Update Doc</h2>
            <form onSubmit={updateDocument}>
                <input type="text" name="id" placeholder="ID" required /> <br />
                <input type="text" name="name" placeholder="Name" required /> <br />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default LoginPage;
