let rooms = {};
// structure of rooms ////////
// {
//     room:{
//         userId: {
//             userName,
//             avatarIndex
//         }
//     }
// }
//////////////////////////////

const addUser = (userId, { room, userName, avatarIndex }) => {

    rooms[room] = {
        ...rooms[room],
        [userId]: {
            userName: userName,
            avatarIndex: avatarIndex
        }
    }
}

const removeUser = (room, userId) => {
    delete rooms[room][userId];
}

const getUsers = (room) => {
    console.log(rooms);
    return rooms[room];
}

module.exports = { addUser, removeUser, getUsers };