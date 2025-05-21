function formatTime(time) {
    const date = new Date(time);
    const thang = date.getMonth() + 1;
    const nam = date.getFullYear();
    return `Tháng ${thang}/${nam}`;
}

function formatDecimal(num) {
    return new Intl.NumberFormat('de-DE').format(num);
};

module.exports = {
    formatTime: formatTime,
    formatDecimal: formatDecimal
}