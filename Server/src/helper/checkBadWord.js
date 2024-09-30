const dataTest = [
	"ngu", "khốn nạn", "hèn hạ",
	"vô liêm sỉ",
	"đồ khốn",
	"đồ điên",
	"đồ đần",
	"cc",
	"cl",
	"đm",
	"địt",
	"lồn",
	"cặc",
	"đụ",
	"buồi",
	"dcm",
	"đcm",
	"chết",
	"đĩ",
	"điếm",
	"cu",
	"đụ",
	"rác rưởi",
	"súc vật",
	"súc sinh",
	"đồ chó",
	"cứt",
	"ỉa",
	"đỉ",
];

/**
 * Check have bad word in text
 * @param {string} str
 * @returns {boolean}
 */
function checkBadWord(str) {
	return dataTest.some(item => str.toLowerCase().includes(` ${item} `));
}

module.exports = checkBadWord;
