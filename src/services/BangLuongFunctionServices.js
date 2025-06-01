function formatTime(time) {
    const date = new Date(time);
    const thang = date.getMonth() + 1;
    const nam = date.getFullYear();
    return `Tháng ${thang}/${nam}`;
}

function formatDecimal(num) {
    return new Intl.NumberFormat('de-DE').format(num);
};

function chuyenSoThanhChu(num) {
    const ChuSo = ["Không", "Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín"];
    const DonVi = ["", "Nghìn", "Triệu", "Tỷ"];
    if (num === 0) return "Không VNĐ";

    let str = "";
    let hang = 0;
    let n = num;
    while (n > 0) {
        let tram = Math.floor((n % 1000) / 100);
        let chuc = Math.floor((n % 100) / 10);
        let donvi = n % 10;
        let chuoi = "";

        if (n > 100 && (tram !== 0 || chuc !== 0 || donvi !== 0)) {
            chuoi += ChuSo[tram] + " Trăm";
        }
        if (chuc !== 0) {
            if (chuc === 1) {
                chuoi += " Mười";
            } else {
                chuoi += " " + ChuSo[chuc] + " Mươi";
            }
        }
        if (donvi !== 0) {
            if (chuc === 0) {
                chuoi += " Lẻ" + ChuSo[donvi];
            }
            else if (chuc !== 0 && donvi === 1) {
                chuoi += " Mốt";
            } else if (chuc !== 0 && donvi === 5) {
                chuoi += " Lăm";
            } else {
                chuoi += " " + ChuSo[donvi];
            }
        }
        if (chuoi !== "") {
            chuoi += " " + DonVi[hang] + " ";
        }
        str = chuoi + str;
        n = Math.floor(n / 1000);
        hang++;
    }
    return str.trim() + " Đồng";
};

const BangLuongFunctionServices = {
    formatTime,
    formatDecimal,
    chuyenSoThanhChu
}
export default BangLuongFunctionServices;