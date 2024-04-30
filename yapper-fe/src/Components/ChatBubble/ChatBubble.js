import React, { useContext, useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Send from '@mui/icons-material/Send';
import Clear from '@mui/icons-material/Clear';

import './ChatBubble.css';
import UpdateAvatarDialog from "../Dialogs/UpdateAvatarDialog";
import { avatarsList } from "../../Common/AvatarsList";
import defaultAvatar from "../../assets/avatars/01.png";
import { SocketContext } from "../../App";
import { useLocation, useNavigate } from 'react-router-dom';

export function ChatBubbleOthers(props) {
    const socket = useContext(SocketContext);

    return (
        <div className='chatBubbleParent'>
            <div className='chatBubbleAvatar'></div>
            <div className='chatBubbleTxt'>
                {props.message}
            </div>
        </div>
    );
}

export function ChatBubbleSelf(props) {
    const socket = useContext(SocketContext);

    return (
        <div className='chatBubbleParent' style={{ marginLeft: "auto" }}>
            <div className='chatBubbleTxtSelf'>
                {props.message}
            </div>
        </div>
    );
}

export function ChatBroadcast(props) {
    const socket = useContext(SocketContext);
    const EnterMsgComp = () =>
        <><strong>{props.userName}</strong> has <strong style={{ color: "#2ab296" }}>entered</strong> room: <strong>{props.room}</strong></>

    const LeftMsgComp = () =>
        <><strong>{props.userName}</strong> has <strong style={{ color: "rgb(215 91 91)" }}>left</strong> room: <strong>{props.room}</strong></>

    return (
        <div className='chatBubbleParent chatBroadcastParent'>
            <div className='chatBroadcastTxt'>
                {props.type === "new" && <EnterMsgComp />}
                {props.type === "left" && <LeftMsgComp />}
            </div>
        </div>
    );
}
