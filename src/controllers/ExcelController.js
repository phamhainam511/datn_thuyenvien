import excelService from '../services/ExcelService.js';

const exportCV = async (req, res) => {
  try {
    const id = req.params.id;
    await excelService.generateSeafarerCV(id, res);
  } catch (err) {
    console.error('Lỗi khi tạo file Excel:', err);
    res.status(500).send('Đã xảy ra lỗi khi tạo file Excel.');
  }
};

module.exports = { exportCV };
