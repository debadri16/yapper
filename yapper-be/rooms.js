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
// structure of users ////////
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

const roomsCleanup = (room) => {
    // delete empty room
    if (Object.keys(rooms[room]).length === 0) {
        delete rooms[room];
    }
}

const usersCleanup = (userId) => {
    // delete empty users
    if (Object.keys(users[userId]).length === 0) {
        delete users[userId];
    }
}

const removeUser = (room, userId) => {
    console.log(room, userId);
    delete rooms[room][userId];

    // remove user only if not banned
    if (!users[userId][room].isBanned)
        delete users[userId][room];

    roomsCleanup(room);
    usersCleanup(userId);
}

// need to test properly for banned users
// banned users data will remain which might create discrepancy
const disconnectUser = (userId) => {
    // one userId can enter one room only at a time
    // since different tab will create new userId (socket.id)

    // if someone reloads the page or clicks back button then the socket.id will change
    if (users[userId] !== undefined) {
        let room = Object.keys(users[userId])[0];
        let userDetails = {...rooms[room][userId], room, userId}
        removeUser(room, userId);
        return userDetails;
    }
    return null;
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
    // sending userId (socket.id) might be a security threat. Will have to verify
    return {...rooms[room][userId], userId};
}

export { addUser, removeUser, getUsers, disconnectUser, banUser, getUserDetail };
