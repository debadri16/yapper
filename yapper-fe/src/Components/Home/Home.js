import React, { useContext, useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Send from '@mui/icons-material/Send';
import Clear from '@mui/icons-material/Clear';

import './Home.css';
import UpdateAvatarDialog from "../Dialogs/UpdateAvatarDialog";
import { avatarsList } from "../../Common/AvatarsList";
import defaultAvatar from "../../assets/avatars/01.png";
import { SocketContext } from "../../App";

function Home() {

    const [editAvatar, setEditAvatar] = useState(false);

    // persisting index of avatar from dialog
    const [selectedAvatarIndex, setAvatarIndex] = useState(0);
    const [joinRoom, setJoinRoom] = useState(false);
    const [roomID, setRoomID] = useState('');

    const socket = useContext(SocketContext);

    useEffect(() => {
        // send message to server
        socket.emit("login", {userName: "Medsieeeee", room: "Ramrajatala", avatarIndex:0}, err => {
            console.log(err);
        });
    }, []);

    let create_room = () => {

        console.log('create')

    }

    let join_room = () => {
        console.log('join');
        setJoinRoom(true);
        setRoomID('')
    }

    let handleRoomID = (e) => {
        const pattern = /^[0-9\b]+$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            setRoomID(e.target.value);
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
                        <AddCircleOutlineOutlinedIcon className="btnIcon" />
                    </button>
                </div>
                {!joinRoom &&
                    <div className='homeBtnDiv'>
                        <button className='homeBtn' onClick={join_room}>
                            <span>Join Room</span>
                            <GroupAddOutlinedIcon className="btnIcon" />
                        </button>
                    </div>
                }
                {joinRoom &&
                    <div className="joinRoomDiv">
                        <TextField error={false} required id="standard-basic" label="Room ID" variant="standard"
                            value={roomID}
                            inputProps={{ maxLength: 6 }}
                            onChange={handleRoomID} />
                        <div className='join_btn_grp'>
                            <button className="cancel_btn" onClick={() => setJoinRoom(false)}><Clear /></button>
                            <button className="next_btn"><Send /></button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Home