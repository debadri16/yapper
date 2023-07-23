import React, { useContext, useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Send from '@mui/icons-material/Send';
import Clear from '@mui/icons-material/Clear';

import './ChatInterface.css';
import UpdateAvatarDialog from "../Dialogs/UpdateAvatarDialog";
import { avatarsList } from "../../Common/AvatarsList";
import defaultAvatar from "../../assets/avatars/01.png";
import { SocketContext } from "../../App";
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChatInterface(props) {
    const socket = useContext(SocketContext);

    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div className='chatInterface'>
            <div className='chatSpace'></div>
            <div className='textSpace'>
                <div className='textBox'>
                    <TextField required id="standard-basic" placeholder="Type your message..." variant="standard" fullWidth multiline rows={1} InputProps={{ disableUnderline: true }} />
                </div>
                <div className='textSendBtn'>
                    <button className="next_btn btn_resize"><Send /></button>
                </div>

            </div>
        </div>
    );
}