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

let exportBangLuong = (dataTable, thang) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Bảng lương');

            // Dòng đầu đề ở đây
            worksheet.mergeCells('A1:D2');
            worksheet.getCell('A1').value = 'CÔNG TY TNHH ĐẦU TƯ VÀ PHÁT TRIỂN NGUỒN NHÂN LỰC PITSCO';
            worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('A1').font = { size: 12, bold: true };

            worksheet.mergeCells('A3:F3');
            worksheet.getCell('A3').value = `BẢNG KÊ CHI TIẾT THANH TOÁN TIỀN LƯƠNG THÁNG ${thang}`;
            worksheet.getCell('A3').alignment = { horizontal: 'center' };
            worksheet.getCell('A3').font = { size: 12, bold: true };

            // Set độ rộng cột
            worksheet.getColumn(1).width = 5;    // STT
            worksheet.getColumn(2).width = 20;   // Tên tài khoản
            worksheet.getColumn(3).width = 20;   // Số tài khoản
            worksheet.getColumn(4).width = 20;   // Tên ngân hàng
            worksheet.getColumn(5).width = 15;   // Tổng tiền
            worksheet.getColumn(6).width = 50;   // Nội dung

            // Tạo định dạng Border (viền mỏng)
            const borderStyles = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };

            // Thêm tiêu đề cột vào dòng 5
            const headerRow = worksheet.getRow(5);
            headerRow.values = ['STT', 'Tên tài khoản', 'Số tài khoản', 'Tên ngân hàng', 'Tổng tiền', 'Nội dung'];
            headerRow.font = { bold: true };
            headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
            headerRow.height = 20;

            // Border cho tiêu đề cột ở dòng thứ 5
            headerRow.eachCell(cell => {
                cell.border = borderStyles;
            });

            dataTable.forEach((row, index) => {
                const r = worksheet.getRow(6 + index);
                r.values = [
                    index + 1,
                    row.thuyenvien?.hoten || '',
                    row.thuyenvien?.taikhoannganhang?.stk || '',
                    row.thuyenvien?.taikhoannganhang?.tennganhang || '',
                    Number(row.tongtien),
                    ''
                ];
                r.getCell(5).numFmt = '#,##0';
                r.eachCell(cell => {
                    cell.border = borderStyles;
                });
            });

            // Dòng tổng cộng
            const totalRow = dataTable.length + 6;
            worksheet.mergeCells(`A${totalRow}:D${totalRow}`);
            worksheet.getCell(`A${totalRow}`).value = 'Tổng';
            worksheet.getCell(`A${totalRow}`).font = { bold: true };
            worksheet.getCell(`A${totalRow}`).alignment = { horizontal: 'center' };

            worksheet.getCell(`E${totalRow}`).value = { formula: `SUM(E6:E${totalRow - 1})` };
            worksheet.getCell(`E${totalRow}`).numFmt = '#,##0';
            worksheet.getCell(`E${totalRow}`).font = { bold: true };
            worksheet.getCell(`E${totalRow}`).alignment = { horizontal: 'right' };
            worksheet.getRow(totalRow).eachCell(cell => {
                cell.border = borderStyles;
            });

            // Tổng tiền bằng chữ ở đây
            const totalTien = dataTable.reduce((sum, i) => sum + Number(i.tongtien), 0);  //reduce là hàm tính tổng
            worksheet.getCell(`B${totalRow + 2}`).value = 'Bằng chữ:';

            worksheet.mergeCells(`C${totalRow + 2}:E${totalRow + 2}`);
            worksheet.getCell(`C${totalRow + 2}`).value = BangLuongFunctionServices.chuyenSoThanhChu(totalTien);
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
    exportBangLuong: exportBangLuong
}