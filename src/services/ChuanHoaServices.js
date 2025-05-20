function chuanHoaTen(ten) {
    if (typeof ten !== 'string') return ten;
    return ten
        .trim() 
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' ');
}
module.exports = {
    chuanHoaTen : chuanHoaTen,

};