import React, { useContext, useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Send from '@mui/icons-material/Send';
import Clear from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";

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
    const [isHomeBtnDisabled, setHomeBtnDisable] = useState(true);
    const [isJoinBtnDisabled, setJoinBtnDisable] = useState(true);
    const [userName, setuserName] = useState('');

    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    // will listen to server to get all users from the room when new user is added
    useEffect(() => {
        socket.on("users", users => {
            console.log(users)
        })
    }, []);

    let create_room = () => {
        let room = Math.random().toString(20).substring(2, 7);
        socket.emit("enter room", { userName: userName, room: room, avatarIndex: selectedAvatarIndex }, err => {
            console.log(err);
        });
        // sending room id to Dashboard component
        navigate("/dashboard",{state:{room: room}});
    }

    let join_room = () => {
        console.log('join');
        setJoinRoom(true);
        setRoomID('');
    }

    let handleRoomID = (e) => {
        const pattern = /^[0-9a-z\b]+$/;
        if (e.target.value === '' || pattern.test(e.target.value)) {
            setRoomID(e.target.value);
        }
        (e.target.value.length != 5) ? setJoinBtnDisable(true) : setJoinBtnDisable(false);
    }

    let handleUserName = (e) => {
        (!e.target.value.replace(/\s/g, '').length) ? setHomeBtnDisable(true) : setHomeBtnDisable(false);
        setuserName(e.target.value);
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
                    <TextField error={false} required id="standard-basic" label="Display Name" variant="standard"
                        value={userName}
                        inputProps={{ maxLength: 20 }}
                        onChange={handleUserName} />
                </div>
                <div className='homeBtnDiv'>
                    <button className='homeBtn' onClick={create_room} disabled={isHomeBtnDisabled}>Create Room
                        <AddCircleOutlineOutlinedIcon className="btnIcon" />
                    </button>
                </div>
                {!joinRoom &&
                    <div className='homeBtnDiv'>
                        <button className='homeBtn' onClick={join_room} disabled={isHomeBtnDisabled}>
                            <span>Join Room</span>
                            <GroupAddOutlinedIcon className="btnIcon" />
                        </button>
                    </div>
                }
                {joinRoom &&
                    <div className="joinRoomDiv">
                        <TextField error={false} required id="standard-basic" label="Room ID" variant="standard"
                            value={roomID}
                            inputProps={{ maxLength: 5 }}
                            onChange={handleRoomID} />
                        <div className='join_btn_grp'>
                            <button className="cancel_btn" onClick={() => { setJoinRoom(false); setJoinBtnDisable(true) }}><Clear /></button>
                            <button className="next_btn" onClick={() => navigate("/dashboard")} disabled={isJoinBtnDisabled}><Send /></button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Home