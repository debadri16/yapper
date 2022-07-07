import React, { useContext, useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Send from '@mui/icons-material/Send';
import Clear from '@mui/icons-material/Clear';

import './Dashboard.css';
import UpdateAvatarDialog from "../Dialogs/UpdateAvatarDialog";
import { avatarsList } from "../../Common/AvatarsList";
import defaultAvatar from "../../assets/avatars/01.png";
import { SocketContext } from "../../App";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        console.log(state.room);
    }, []);

    // // browser explicit back button click handle
    useEffect(() => {
        window.addEventListener('popstate', (e)=>explicitLeaveUser(e));
        return () => {
            window.removeEventListener('popstate', (e)=>explicitLeaveUser(e));
        };
    }, []);

    const explicitLeaveUser = (e) => {
        socket.emit("leave room", state.room, err => {
            console.log(err);
        });
    }

    return (
        <div>This is Dashboard</div>
    );
}