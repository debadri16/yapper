let rooms = {};

const addUser = (userId, {room, userName, avatarIndex}) => {
    rooms[userId] = {
        room: room,
        userName: userName,
        avatarIndex: avatarIndex
    };
}

const removeUser = (userId) => {
    delete rooms[userId];
}

const getAllUsers = () => {
    return rooms;
}

module.exports = {addUser, removeUser, getAllUsers};