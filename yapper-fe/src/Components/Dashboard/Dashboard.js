import React, { useContext, useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Send from '@mui/icons-material/Send';
import Clear from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';

import './Dashboard.css';
import UpdateAvatarDialog from "../Dialogs/UpdateAvatarDialog";
import { avatarsList } from "../../Common/AvatarsList";
import defaultAvatar from "../../assets/avatars/01.png";
import { SocketContext } from "../../App";
import { useLocation, useNavigate } from 'react-router-dom';
import ChatInterface from "../ChatInterface/ChatInterface";

export default function Dashboard(props) {
    const socket = useContext(SocketContext);

    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div className='dashboardParent'>
            <div className='leftDiv'>
                <button><LogoutIcon /></button>
            </div>
            <div className='rightDiv'>
                <ChatInterface userName={props.userName} room={props.room}></ChatInterface>
            </div>
        </div>
    );
}