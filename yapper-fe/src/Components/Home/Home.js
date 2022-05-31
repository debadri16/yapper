import React, { useState } from "react";

import './Home.css';

function Home() {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    let handleNameChange = (event) => {
        setName(event.target.value);
        setError(false);
    };

    let create_room = () => {
        if (!name) {
            setError(true);
            console.log('no name')

        } else {
            console.log('create')
        }
    }

    let join_room = () => {
        if (!name) {
            setError(true);
            console.log('no name')

        } else {
            console.log('join')
        }
    }

    return (
        <div className="bgDiv">
            <div className="loginContainer">
                <div className='login-detils'>
                    <div className='login-details-grp'>
                        <div>
                            <button className='img-button'><img className='avatar' src='https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png' alt='mango-avatar'></img></button>
                            <div>
                                <div className='input-data'>
                                    <input type="text" onChange={handleNameChange} required />
                                    <div className='underline'></div>
                                    <label>Username</label>
                                </div>
                                <div> {error ? <small className="error-msg">Username field is required to create/join room</small> : null}</div>
                            </div>
                        </div>
                        <div className='button-container'>
                            <div className='btn-grp'>
                                <button className='button-create' onClick={create_room}>Create Room</button>
                                <button className='button-join' onClick={join_room}>Join Room</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home