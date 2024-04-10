/*
 * userOnline: store all user online
 * userOnline = [{_id, firstname, lastname, socketId}]
 * retailerOnline: store all retailer online
 * retailerOnline = [{retailerId, name, socketId}]
 */

let userOnline = [];
let retailerOnline = [];

const socketServer = socket => {
    socket.on('connection_error', error => {
        console.error('error', error);
    });
    socket.on('join', user => {
        !userOnline.some(u => u._id === user._id) &&
            userOnline.push({ ...user, socketId: socket.id });
    });

    socket.on('join-retailer', data => {
        !retailerOnline.some(re => re.retailerId === data.retailerId) &&
            retailerOnline.push({ ...data, socketId: socket.id });
    });

    socket.on('disconnect', () => {
        userOnline = userOnline.filter(user => user.socketId !== socket.id);
        retailerOnline = retailerOnline.filter(
            user => user.socketId !== socket.id
        );
    });

    socket.on('notification', data => {
        const user = userOnline.find(user => user._id === data.receiverId);
        if (user) {
            socket.to(user.socketId).emit('notification', data);
        }
    });

    socket.on('order', data => {
        const retailer = retailerOnline.find(
            retailer => retailer.retailerId === data.receiverId
        );
        console.table({
            retailer: retailer?.retailerId,
            receiverId: data?.receiverId,
            true: retailer?.retailerId === data?.receiverId,
        });
        if (retailer) {
            socket.to(retailer.socketId).emit('order', data);
        }
    });

    socket.on('notification-retailer', data => {
        const user = userOnline.find(user => user.id === data.receiverId);
        if (user) {
            socket.to(user.socketId).emit('notification-retailer', data);
        }
    });
};

module.exports = socketServer;
