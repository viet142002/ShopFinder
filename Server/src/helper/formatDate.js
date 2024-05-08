function formatDate(date, format = "dd/MM/yyyy") {
	if (!date) return "";

	const d = new Date(date);
	const year = d.getFullYear();
	const month = `0${d.getMonth() + 1}`.slice(-2);
	const day = `0${d.getDate()}`.slice(-2);

	return format.replace("yyyy", year).replace("MM", month).replace("dd", day);
}

module.exports = {
	formatDate,
};
