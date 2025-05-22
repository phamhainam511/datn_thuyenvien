import db from '../models/index';
import BangLuongFunctionServices from '../services/BangLuongFunctionServices';
const ExcelJS = require('exceljs');
const { Op } = require('sequelize');

let getAllBangLuong = async (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereTime = {};
            if (keyword) {
                const time = keyword.match(/^(\d{1,2})\/(\d{4})$/);
                if (time) {
                    const month = Number(time[1]);
                    const year = Number(time[2]);

                    const startDate = new Date(year, month - 1, 1);
                    const endDate = new Date(year, month, 0);

                    whereTime = {
                        thoigian: {
                            [Op.between]: [startDate, endDate]
                        }
                    };
                }
            }

            const bangluongs = await db.Bangluong.findAll({
                attributes: ['id_bangluong', 'thuyenvien_id', 'tongtien', 'thoigian', 'tinhtrang'],
                include: [
                    {
                        model: db.Thuyenvien,
                        as: 'thuyenvien',
                        include: [
                            {
                                model: db.Taikhoannganhang,
                                as: 'taikhoannganhang',
                                attributes: ['stk', 'tentaikhoan', 'tennganhang']
                            }
                        ]
                    }],
                where: whereTime,
                order: [
                    ['thuyenvien_id', 'ASC']
                ]
            });

            resolve(bangluongs);
        } catch (e) {
            reject(e);
        }
    })
};

let getComboTime = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let comboTime = await db.Bangluong.findAll({
                attributes: ['thoigian'],
                order: [['thoigian', 'DESC']]
            })
            let unique = new Set();

            comboTime.forEach(item => {
                const date = new Date(item.thoigian);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString();

                unique.add(`${month}/${year}`);
            });
            const result = Array.from(unique); //Lọc trùng
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

let getBangLuongId = (bangluong_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bangluong = await db.Bangluong.findOne({
                where: { id: bangluong_id }
            })
            if (bangluong) {
                resolve(bangluong);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
};

let deleteBangLuong = (bangluong_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bangluong = await db.Bangluong.findOne({
                where: { id_bangluong: bangluong_id }
            })
            if (bangluong) {
                await bangluong.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

const ExcelJS = require('exceljs');
let BangLuongExcell = (dataTable, thang) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Bảng lương');

            // Dòng đầu đề ở đây
            worksheet.mergeCells('A1:C2');
            worksheet.getCell('A1').value = 'CÔNG TY TNHH ĐẦU TƯ VÀ PHÁT TRIỂN NGUỒN NHÂN LỰC PITSCO';
            worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('A1').font = { size: 12, bold: true };

            worksheet.mergeCells('A3:F3');
            worksheet.getCell('A3').value = `BẢNG KÊ CHI TIẾT THANH TOÁN TIỀN LƯƠNG THÁNG ${thang}`;
            worksheet.getCell('A3').alignment = { horizontal: 'center' };
            worksheet.getCell('A3').font = { size: 12, bold: true };

            // Tên cột ở đây
            worksheet.columns = [
                { header: 'STT', key: 'stt', width: 5 },
                { header: 'Tên tài khoản', key: 'tentaikhoan', width: 20 },
                { header: 'Số tài khoản', key: 'stk', width: 20 },
                { header: 'Tên ngân hàng', key: 'nganhang', width: 50 },
                { header: 'Tổng tiền', key: 'tongtien', width: 15 },
                { header: 'Nội dung', key: 'noidung', width: 50 },
            ];

            // Thêm dữ liệu ở đây
            dataTable.forEach((row, index) => {
                worksheet.addRow({
                    stt: index + 1,
                    tentaikhoan: row.thuyenvien?.taikhoannganhang?.tentaikhoan || '',
                    stk: row.thuyenvien?.taikhoannganhang?.stk || '',
                    nganhang: row.thuyenvien?.taikhoannganhang?.tennganhang || '',
                    tongtien: row.tongtien,
                    noidung: '',
                });
            });

            // Định dạng cột
            worksheet.getColumn('tongtien').numFmt = '#,##0';
            worksheet.getColumn('stt').alignment = { horizontal: 'center' };

            // Tạo định dạng Border (viền mỏng)
            const borderStyles = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

            // Border cho tên cột ở dòng thứ 5
            worksheet.getRow(5).eachCell(cell => {
                cell.border = borderStyles;
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.font = { bold: true };
            });

            // Border cho các dòng dữ liệu
            for (let i = 6; i < 6 + dataTable.length; i++) {
                worksheet.getRow(i).eachCell(cell => {
                    cell.border = borderStyles;
                });
            }

            // Dòng tổng cộng
            const totalRow = dataTable.length + 6;
            worksheet.mergeCells(`A${totalRow}:D${totalRowNumber}`);
            worksheet.getCell(`A${totalRow}`).value = 'Tổng';
            worksheet.getCell(`A${totalRowNumber}`).font = { bold: true };
            worksheet.getCell(`A${totalRowNumber}`).alignment = { horizontal: 'center' };

            worksheet.getCell(`E${totalRow}`).value = { formula: `SUM(E6:E${totalRow - 1})` };
            worksheet.getCell(`E${totalRow}`).font = { bold: true };
            worksheet.getCell(`E${totalRow}`).alignment = { horizontal: 'right' };
            worksheet.getRow(totalRow).eachCell(cell => {
                cell.border = borderStyles;
            });

            // Tổng tiền bằng chữ ở đây
            const totalTien = dataTable.reduce((sum, i) => sum + i.tongtien, 0);  //reduce là hàm tính tổng
            worksheet.getCell(`B${totalRow + 2}`).value = 'Bằng chữ:';

            worksheet.mergeCells(`C${totalRow + 2}:F${totalRow + 2}`);
            worksheet.getCell(`C${totalRow}` + 2).value = BangLuongFunctionServices.chuyenSoThanhChu(totalTien);
            worksheet.getCell(`C${totalRow + 2}`).alignment = { horizontal: 'left' };

            // Chữ ký của kế toán trưởng và tổng giám đốc ở đây
            worksheet.mergeCells(`B${totalRow + 3}:C${totalRow + 3}`);
            worksheet.getCell(`B${totalRow + 3}`).value = 'Kế toán trưởng';
            worksheet.getCell(`B${totalRow + 3}`).font = { bold: true };
            worksheet.getCell(`B${totalRow + 3}`).alignment = { horizontal: 'center' };

            worksheet.getCell(`F${totalRow + 3}`).value = 'Tổng Giám đốc';
            worksheet.getCell(`F${totalRow + 3}`).font = { bold: true };
            worksheet.getCell(`F${totalRow + 3}`).alignment = { horizontal: 'center' };

            resolve(workbook);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllBangLuong: getAllBangLuong,
    getComboTime: getComboTime,
    getBangLuongId: getBangLuongId,
    deleteBangLuong: deleteBangLuong,
    BangLuongExcell: BangLuongExcell
}