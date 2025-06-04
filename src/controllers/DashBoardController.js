import DashBoardServices from "../services/DashBoardServices.js";

const getExpiringCertificateCount = async (days = 365) => {
    return await DashBoardServices.getExpiringCertificateCount(days);
};

const getPendingContractsCount = async () => {
    return await DashBoardServices.getPendingContractsCount();
};

const getThuyenvienDangTrenTau = async () => {
    return await DashBoardServices.countThuyenvienDangTrenTau();
}

const getThuyenvienDangChoTau = async () => {
    return await DashBoardServices.countThuyenvienDangChoTau();
}

const getChucVuStats = async () => {
    return await DashBoardServices.getChucVuStats();
};

const getThuyenvienTrangThaiStats = async () => {
    return await DashBoardServices.getThuyenvienTrangThaiStats();
};

const DashBoardController = {
    getExpiringCertificateCount,
    getPendingContractsCount,
    getThuyenvienDangTrenTau,
    getThuyenvienDangChoTau,
    getChucVuStats,
    getThuyenvienTrangThaiStats
}

export default DashBoardController;
