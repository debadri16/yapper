import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { avatarsList } from '../../Common/AvatarsList';
import { useEffect, useState } from 'react';
import './UpdateAvatarDialog.css';

function UpdateAvatarDialog(props) {

    // to maintain index of the chosen avatar
    const [selectedAvatarIndex, setAvatarIndex] = useState(props.selectedAvatarIndex);

    // useEffect(() => {
    //     console.log(avatarsList)
    // }, []);

    const handleAvatarChange = index => {
        // current component update
        setAvatarIndex(index);
        // parent component update
        props.handleAvatarChange(index);
    }

    return (
        <Dialog open={true}
            PaperProps={{
                sx: {
                    minWidth: "60%",
                    minHeight: "70%"
                }
            }}>
            <DialogTitle id="alert-dialog-title">
                {"Choose Avatar"}
            </DialogTitle>
            <DialogContent dividers={true}>
                <div className="avatarContainer">
                    {avatarsList.map((imgURL, index) => (
                        <div key={index}
                            className={selectedAvatarIndex === index ? "dialogImgDiv selectedAvatar" : "dialogImgDiv"}
                            onClick={() => handleAvatarChange(index)}>
                            <img className="dialogAvatar" src={imgURL} alt="avatar" />
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateAvatarDialog;