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
import { ChatBubbleOthers, ChatBubbleSelf, ChatBroadcast } from "../ChatBubble/ChatBubble";

export default function ChatInterface(props) {
    const socket = useContext(SocketContext);

    const [msgTxt, setMsgTxt] = useState("");

    const [txtList, setTxtList] = useState([]);

    const handleTxtChange = e => {
        setMsgTxt(e.target.value);
    };

    const sendMsg = () => {
        // remove trailing spaces
        socket.emit("send text", props.room, msgTxt.trim(), err => {
            console.log(err);
        });
        setMsgTxt("");
        updateTxtList({ userId: socket.id, txt: msgTxt.trim() }, "send");
    }

    // type: send/receive/new/left
    const updateTxtList = (sender, type) => {
        setTxtList(prevState => [...prevState, { ...sender, type }]);
    }

    // receiving text listener
    useEffect(() => {
        // when any text is received from other users
        // sender example -> {avatarIndex: 0, txt: "yo", type: "receive", userId: "ya0Bf98zGi5u_7mSAAAN", userName: "asdasd"}
        socket.on("receive text", (sender) => {
            // to prevent un-expected behavior due to closures
            updateTxtList(sender, "receive");
        });

        // will listen to server to get newly joined user in that room
        // user example -> {avatarIndex: 0, room: "ad5di", type: "new", userId: "ya0Bf98zGi5u_7mSAAAN", userName: "asdasd"}
        socket.on("new user", user => {
            updateTxtList(user, "new");
        });

        // when user leaves
        // user example -> {avatarIndex: 0, room: "ad5di", type: "left", userId: "ya0Bf98zGi5u_7mSAAAN", userName: "asdasd"}
        socket.on("user left", user => {
            // console.log(userId)
            updateTxtList(user, "left");
        });

    }, []);

    return (
        <div className='chatInterface'>
            <div className='chatSpace'>
                <ChatBroadcast userName={props.userName} room={props.room} type="new" />
                {txtList.map((sender, idx) => (sender.type === "send") ?
                    <ChatBubbleSelf key={idx} message={sender.txt} /> :
                    (sender.type === "receive") ?
                        <ChatBubbleOthers key={idx} message={sender.txt} /> :
                        <ChatBroadcast key={idx} userName={sender.userName} room={props.room} type={sender.type}/>
                )}
            </div>
            <div className='textSpace'>
                <div className='textBox'>
                    <TextField value={msgTxt} onChange={handleTxtChange} required id="standard-basic" placeholder="Type your message..." variant="standard" fullWidth multiline rows={1} InputProps={{ disableUnderline: true }} />
                </div>
                <div className='textSendBtn'>
                    <button disabled={msgTxt.trim().length === 0} onClick={sendMsg} className="next_btn btn_resize"><Send /></button>
                </div>

            </div>
        </div>
    );
}