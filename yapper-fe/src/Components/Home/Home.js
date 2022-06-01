import React, { useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

import './Home.css';
import UpdateAvatarDialog from "../Dialogs/UpdateAvatarDialog";
import { avatarsList } from "../../Common/AvatarsList";
import defaultAvatar from "../../assets/avatars/01.png";

function Home() {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [editAvatar, setEditAvatar] = useState(false);

    // persisting index of avatar from dialog
    const [selectedAvatarIndex, setAvatarIndex] = useState(0);


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
            {editAvatar &&
                <UpdateAvatarDialog handleClose={() => setEditAvatar(false)} selectedAvatarIndex={selectedAvatarIndex}
                    handleAvatarChange={setAvatarIndex} />
            }
            <div className="loginContainer">
                <div className="imgDiv" onClick={() => setEditAvatar(true)}>
                    <img className="homeAvatar"
                        // avatarlist imports are async, using default image if they are not loaded
                        // xx.png -> string length is 6
                        src={avatarsList[selectedAvatarIndex].length > 6 ? avatarsList[selectedAvatarIndex] : defaultAvatar} alt="avatar" />
                    <ModeEditOutlineOutlinedIcon className="avatarEditBtn" />
                </div>
                <div className="userNameContainer">
                    <TextField error={false} required id="standard-basic" label="Display Name" variant="standard" />
                </div>
                <div className='homeBtnDiv'>
                    <button className='homeBtn' onClick={create_room}>Create Room
                        <AddCircleOutlineOutlinedIcon className="btnIcon"/>
                    </button>
                </div>
                <div className='homeBtnDiv'>
                    <button className='homeBtn' onClick={join_room}>
                        <span>Join Room</span>
                        <GroupAddOutlinedIcon className="btnIcon"/>
                    </button>
                </div>
                
                
                {/* <div className='login-detils'>
                    <div className='login-details-grp'>
                        <div>
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
                </div> */}
            </div>
        </div>
    );
}

export default Home