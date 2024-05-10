/*
 * userOnline: store all user online
 * userOnline = [{_id, fullname, socketId}]
 * retailerOnline: store all retailer online
 * retailerOnline = [{retailerId, name, socketId}]
 */

let userOnline = [];
let retailerOnline = [];

const socketServer = socket => {
	socket.on("join", user => {
		console.log("🚀 ~ socketServer ~ user:", user.fullname);
		!userOnline.some(u => u._id === user._id) &&
			userOnline.push({ ...user, socketId: socket.id });
	});

	socket.on("join-retailer", data => {
		console.log("🚀 ~ socketServer ~ retailer:", data.name);
		!retailerOnline.some(re => re.retailerId === data.retailerId) &&
			retailerOnline.push({ ...data, socketId: socket.id });
	});

	socket.on("disconnect", () => {
		console.log("🚀 ~ socketServer ~ disconnect ~ socket.id:", socket.id);
		userOnline = userOnline.filter(user => user.socketId !== socket.id);
		retailerOnline = retailerOnline.filter(
			user => user.socketId !== socket.id
		);
	});

	socket.on("notification", data => {
		const user = userOnline.find(user => user._id === data.receiverId);
		if (user) {
			console.log("🚀 ~ socketServer ~ notification ~ user:", user);
			socket.to(user.socketId).emit("notification", data);
		}
	});

	socket.on("order", data => {
		const retailer = retailerOnline.find(
			retailer => retailer.retailerId === data.receiverId
		);
		if (retailer) {
			socket.to(retailer.socketId).emit("order", data);
		}
	});

	socket.on("notification-retailer", data => {
		const user = userOnline.find(user => user.id === data.receiverId);
		if (user) {
			socket.to(user.socketId).emit("notification-retailer", data);
		}
	});

	socket.on("connect_error", err => {
		// the reason of the error, for example "xhr poll error"
		console.log(err.message);

		// some additional description, for example the status code of the initial HTTP response
		console.log(err.description);

		// some additional context, for example the XMLHttpRequest object
		console.log(err.context);
	});
};

module.exports = socketServer;
