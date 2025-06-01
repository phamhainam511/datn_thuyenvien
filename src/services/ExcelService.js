const ExcelJS = require('exceljs');
const { Thuyenvien, ThuyenvienChungchi, Chungchi } = require('../models');

async function getSeafarerById(id) {
    const seafarer = await Thuyenvien.findOne({
        where: { id_thuyenvien: id }
    });

    if (!seafarer) {
        throw new Error('Không tìm thấy thuyền viên');
    }

    return seafarer.toJSON();
}

async function generateSeafarerCV(id, res) {
    const seafarer = await getSeafarerById(id);
    const certificates = await ThuyenvienChungchi.findAll({
        where: { id_thuyenvien: id },
        include: [{
            model: Chungchi,
            as: 'chungchi',
            attributes: ['tenchungchi'], 
        }],
        raw: false 
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Seafarer CV');


    worksheet.columns = [
        { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 }, { width: 30 },
    ];

    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = "SEAFARER'S CURRICULUM VITAE FORM";
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { bold: true, size: 14, color: { argb: '0000FF' } };

    worksheet.mergeCells('A3:E3');
    worksheet.getCell('A3').value = "PERSONAL INFORMATION";
    worksheet.getCell('A3').font = { bold: true };
    worksheet.getCell('A3').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D9E1F2' },
    };

    worksheet.addRow(['Họ tên', seafarer.hoten || '', 'CCCD', seafarer.cccd || '', 'Email', seafarer.email || '']);
    worksheet.addRow(['Số điện thoại', seafarer.sodienthoai || '', 'Chiều cao', seafarer.chieucao || '', 'Cân nặng', seafarer.cannang || '']);
    worksheet.addRow(['Nhóm máu', seafarer.nhommau || '', 'Size giày', seafarer.sizegiay || '', 'Tình trạng hôn nhân', seafarer.tinhtranghonnhan || '']);
    worksheet.addRow([]);

    worksheet.mergeCells('A8:E8');
    worksheet.getCell('A8').value = 'CERTIFICATES';
    worksheet.getCell('A8').font = { bold: true };
    worksheet.getCell('A8').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D9E1F2' },
    };

    const headerRow = worksheet.addRow(['Tên chứng chỉ', 'Số hiệu', 'Ngày cấp', 'Ngày hết hạn', 'Nơi cấp']);
    headerRow.eachCell(cell => {
        cell.font = { bold: true };
    });

    for (const cert of certificates) {
        console.log(cert.Chungchi?.tenchungchi); 
        worksheet.addRow([
            cert.chungchi?.tenchungchi || '',
            cert.sohieuchungchi || '',
            cert.ngaycap ? new Date(cert.ngaycap).toLocaleDateString() : '',
            cert.ngayhethan ? new Date(cert.ngayhethan).toLocaleDateString() : '',
            cert.noicap || ''
        ]);
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=seafarer_cv_${seafarer.id_thuyenvien || 'unknown'}.xlsx`);
    await workbook.xlsx.write(res);
    res.end();

}

const ExcelServices = {
    getSeafarerById,
    generateSeafarerCV,
};
export default ExcelServices;
