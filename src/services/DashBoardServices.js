const db = require('../models');
const {
    Op
} = require('sequelize');
const sequelize = db.sequelize;

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
        const count = await db.Hopdong.count({
            where: {
                trangthaihopdong: 'Chờ thanh lý'
            }
        });
        return count;
    } catch (error) {
        console.error("Lỗi khi đếm hợp đồng chờ thanh lý:", error);
        return 0;
    }
};

const countThuyenvienDangTrenTau = async () => {
    try {
        const count = await db.Thuyenvien.count({
            where: {
                trangthai: 'Đang trên tàu'
            }
        });
        return count;
    } catch (error) {
        console.error("Lỗi khi đếm số thuyền viên trên tàu:", error);
        return 0;
    }
};

const countThuyenvienDangChoTau = async () => {
    try {
        const count = await db.Thuyenvien.count({
            where: {
                trangthai: 'Đang chờ tàu'
            }
        });
        return count;
    } catch (error) {
        console.error("Lỗi khi đếm số thuyền viên đang chờ tàu:", error);
        return 0;
    }
};

const getChucVuStats = async () => {
    const result = await db.Lichsuditau.findAll({
        attributes: [
            'chucvu_id',
            [db.sequelize.fn('COUNT', db.sequelize.col('chucvu_id')), 'soluong']
        ],
        include: [{
            model: db.Chucvu,
            as: 'chucvu', // ✅ thêm dòng này
            attributes: ['tenchucvu']
        }],
        group: ['chucvu_id', 'chucvu.id_chucvu'] // ✅ đổi `Chucvu.id_chucvu` -> `chucvu.id_chucvu`
    });

    const labels = result.map(item => item.chucvu?.tenchucvu || 'Không rõ');
    const data = result.map(item => parseInt(item.getDataValue('soluong')) || 0);
    return { labels, data };
};


const getThuyenvienTrangThaiStats = async () => {
    const result = await db.Thuyenvien.findAll({
        attributes: [
            'trangthai',
            [sequelize.fn('COUNT', sequelize.col('trangthai')), 'soluong']
        ],
        group: ['trangthai']
    });

    // Chuyển về định dạng labels + data
    const labelsMap = {
        1: 'Đang trên tàu',
        2: 'Đang chờ tàu',
        3: 'Đang trên bờ'
    };

    const labels = [];
    const data = [];

    result.forEach(item => {
        const tt = item.trangthai;
        labels.push(labelsMap[tt] || `Trạng thái ${tt}`);
        data.push(parseInt(item.dataValues.soluong));
    });

    return { labels, data };
};



module.exports = {
    getExpiringCertificateCount,
    getPendingContractsCount,
    countThuyenvienDangTrenTau,
    countThuyenvienDangChoTau,
    getChucVuStats,
    getThuyenvienTrangThaiStats
};