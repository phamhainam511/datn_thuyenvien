const db = require('../models');
const {
    Op
} = require('sequelize');

const getExpiringCertificateCount = async (days = 30) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // 0:00 ngày mai

    const futureDate = new Date(tomorrow);
    futureDate.setDate(futureDate.getDate() + days); // 0:00 ngày sau 30 ngày tính từ ngày mai

    console.log('Counting certificates from', tomorrow, 'to', futureDate);

    try {
        const count = await db.ThuyenvienChungchi.count({
            where: {
                ngayhethan: {
                    [Op.gte]: tomorrow,  // từ ngày mai trở đi
                    [Op.lt]: futureDate  // trước ngày 31
                }
            }
        });

        return count;
    } catch (error) {
        console.error('Error counting expiring certificates:', error);
        return 0;
    }
};

const getPendingContractsCount = async () => {
    try {
        const count = await db.HopDong.count({
            where: {
                trangthai: 'Chờ thanh lý'
            }
        });
        return count;
    } catch (error) {
        console.error("Lỗi khi đếm hợp đồng chờ thanh lý:", error);
        return 0;
    }
};

module.exports = {
    getExpiringCertificateCount,
    getPendingContractsCount
};