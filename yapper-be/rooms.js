let rooms = {};
// structure of rooms ////////
// {
//     room:{
//         userId: {
//             userName: ""
//             avatarIndex: ""
//         }
//     }
// }
//////////////////////////////

let users = {};
// structure of rooms ////////
// {
//     userId:{
//         room: {
//             isBanned: true/false
//         }
//     }
// }
//////////////////////////////

const addUser = (userId, { room, userName, avatarIndex }) => {

    // adding into rooms
    rooms[room] = {
        ...rooms[room],
        [userId]: {
            userName: userName,
            avatarIndex: avatarIndex
        }
    }

    // adding into users
    users[userId] = {
        ...users[userId],
        [room]: {
            isBanned: false
        }
    }
}

const roomsCleanup = (room)=>{
    // delete empty room
    if(Object.keys(rooms[room]).length === 0){
        delete rooms[room];
    }
}

const usersCleanup = (userId)=>{
    // delete empty users
    if(Object.keys(users[userId]).length === 0){
        delete users[userId];
    }
}

const removeUser = (room, userId) => {
    delete rooms[room][userId];

    // remove user only if not banned
    if(!users[userId][room].isBanned)
        delete users[userId][room];

    roomsCleanup(room);
    usersCleanup(userId);
}

// need to test properly for banned users
// banned users data will remain which might create discrepancy
const disconnectUser = (userId) => {
    // one userId can enter one room only at a time
    // since different tab will create new userId (socket.id)
    let room = Object.keys(users[userId])[0];

    removeUser(room, userId);
    return room;
}

const banUser = (room, userId) => {
    delete rooms[room][userId];
    users[userId][room].isBanned = true;
    roomsCleanup(room);
}

const getUsers = (room) => {
    console.log(rooms);
    return rooms[room];
}

const getUserDetail = (room, userId) => {
    return rooms[room][userId];
}

module.exports = { addUser, removeUser, getUsers, disconnectUser, banUser, getUserDetail };