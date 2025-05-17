import db from '../models';  
import ThuyenVienServices from "../services/ThuyenVienServices";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/uploads/language_certificates');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        cb(null, 'lang_cert_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File upload only supports the following filetypes - ' + filetypes);
        }
    }
}).single('certificate_file');

// Configure multer for certificate file uploads
const certificateStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/uploads/crew_certificates');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        cb(null, 'crew_cert_' + Date.now() + path.extname(file.originalname));
    }
});

const uploadCertificate = multer({ 
    storage: certificateStorage,
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File upload only supports the following filetypes - ' + filetypes);
        }
    }
}).single('crew_certificate_file');

let getAllThuyenVien = async (req, res) => {
    let data = await ThuyenVienServices.getAllThuyenVien();
    return res.render('danhsach_thuyenvien.ejs', {
        dataTable : data
    });
};

let postThuyenVien = async (req, res) => {
    let message = await ThuyenVienServices.createNewThuyenVien(req.body);
    res.redirect('/danh-sach-thuyen-vien');
}

let getEditThuyenVien = async (req, res) => {
    let ThuyenVien_id = req.query.id;
    if(ThuyenVien_id){
        let ThuyenVien_data = await ThuyenVienServices.getThuyenVienId(ThuyenVien_id);
        console.log(ThuyenVien_data);
        return res.send('Tìm thấy thuyền viên');
    }else{
        return res.send('Không tìm thấy thuyền viên');
    }
}

let putThuyenVien = async(req, res) => {
    try {
        let data = req.body;
        await ThuyenVienServices.updateThuyenVienData(req.params.id, data);
        return res.redirect('/danh-sach-thuyen-vien');
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let updateThanNhan = async(req, res) => {
    try {
        let data = req.body;
        let thuyenvien_id = req.params.id;
        await ThuyenVienServices.updateThanNhanData(thuyenvien_id, data);
        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let updateLichSuDiTau = async(req, res) => {
    try {
        let data = req.body;
        let id_lichsuditau = data.id_lichsuditau;
        let thuyenvien_id = data.thuyenvien_id;
        delete data.thuyenvien_id;
        delete data.id_lichsuditau;
        
        await ThuyenVienServices.updateLichSuDiTauData(id_lichsuditau, data);
        
        return res.redirect('/danh-sach-thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let createLichSuDiTau = async(req, res) => {
    try {
        let data = req.body;
        let thuyenvien_id = data.thuyenvien_id;
        
        await ThuyenVienServices.createLichSuDiTau(data);
        
        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let createHocVan = async(req, res) => {
    try {
        let data = req.body;
        await ThuyenVienServices.createHocVan(data);
        return res.redirect('/thuyen-vien/' + data.id_thuyenvien);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let updateHocVan = async(req, res) => {
    try {
        let data = req.body;
        let id = data.id;
        let thuyenvien_id = data.id_thuyenvien;
        
        await ThuyenVienServices.updateHocVan(id, data);
        
        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let deleteHocVan = async(req, res) => {
    try {
        let id = req.params.id;
        let thuyenvien_id = req.params.thuyenvien_id;
        
        await ThuyenVienServices.deleteHocVan(id);
        
        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let deleteThuyenVien = async (req, res) => {
    let ids = req.body.id; // => mảng id
    if (!Array.isArray(ids)) {
        ids = [ids]; // nếu gửi 1 id thì cho thành mảng luôn
    }

    for (let id of ids) {
        await ThuyenVienServices.deleteThuyenVien(id);
    }

    return res.redirect('/danh-sach-thuyen-vien');
};

let getThuyenVienById = async (req, res) => {
    let thuyenvien_id = req.params.id;
    if(thuyenvien_id){
        let thuyenvien_data = await ThuyenVienServices.getThuyenVienId(thuyenvien_id);
        let nhanthanthuyenvien_data = await ThuyenVienServices.getNhanThanThuyenVien(thuyenvien_id);
        let lichsuditau_data = await ThuyenVienServices.getLichSuDiTau(thuyenvien_id);
        let chucvu_data = await ThuyenVienServices.getAllChucVu();
        let tau_data = await ThuyenVienServices.getAllTau();
        let hocvan_data = await ThuyenVienServices.getHocVanThuyenVien(thuyenvien_id);
        let ngoaingu_data = await ThuyenVienServices.getNgoaiNguThuyenVien(thuyenvien_id);
        let chungchi_data = await ThuyenVienServices.getChungChiThuyenVien(thuyenvien_id);

        return res.render('thuyenvien_chitiet.ejs', {
            thuyenvieninfo : thuyenvien_data,
            nhanthanthuyenvieninfo : nhanthanthuyenvien_data,
            lichsuditauinfo : lichsuditau_data,
            chucvuinfo : chucvu_data,
            tauinfo : tau_data,
            hocvaninfo: hocvan_data,
            ngoainguinfo: ngoaingu_data,
            chungchiinfo: chungchi_data
        });
    }
    else{
        return res.send('Không tìm thấy thuyền viên');
    }
}

let createNgoaiNgu = async(req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.send('Lỗi khi tải lên file: ' + err);
        }
        
        try {
            let data = req.body;
            // If file was uploaded, add file path to data
            if (req.file) {
                // Store relative path for database
                data.file = '/uploads/language_certificates/' + req.file.filename;
            }
            
            await ThuyenVienServices.createNgoaiNgu(data);
            return res.redirect('/thuyen-vien/' + data.id_thuyenvien);
        } catch (error) {
            res.send('Lỗi: ' + error.message);
        }
    });
};

let updateNgoaiNgu = async(req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            return res.send('Lỗi khi tải lên file: ' + err);
        }
        
        try {
            let data = req.body;
            let id = data.id;
            let thuyenvien_id = data.id_thuyenvien;
            
            // If file was uploaded, add file path to data
            if (req.file) {
                // Get existing record to check if there's an old file to delete
                const existingRecord = await ThuyenVienServices.getNgoaiNguById(id);
                if (existingRecord && existingRecord.file) {
                    const oldFilePath = path.join(__dirname, '../public', existingRecord.file);
                    // Delete old file if it exists
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                
                // Store relative path for database
                data.file = '/uploads/language_certificates/' + req.file.filename;
            }
            
            await ThuyenVienServices.updateNgoaiNgu(id, data);
            
            return res.redirect('/thuyen-vien/' + thuyenvien_id);
        } catch (error) {
            res.send('Lỗi: ' + error.message);
        }
    });
};

let deleteNgoaiNgu = async(req, res) => {
    try {
        let id = req.params.id;
        let thuyenvien_id = req.params.thuyenvien_id;
        
        // Get the record to find the file path
        const record = await ThuyenVienServices.getNgoaiNguById(id);
        
        // Delete the file if it exists
        if (record && record.file) {
            const filePath = path.join(__dirname, '../public', record.file);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        
        await ThuyenVienServices.deleteNgoaiNgu(id);
        
        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let createChungChi = async(req, res) => {
    uploadCertificate(req, res, async function(err) {
        if (err) {
            return res.send('Lỗi khi tải lên file: ' + err);
        }
        
        try {
            let data = req.body;
            // If file was uploaded, add file path to data
            if (req.file) {
                // Store relative path for database
                data.file = '/uploads/crew_certificates/' + req.file.filename;
            }
            
            await ThuyenVienServices.createChungChi(data);
            return res.redirect('/thuyen-vien/' + data.id_thuyenvien);
        } catch (error) {
            res.send('Lỗi: ' + error.message);
        }
    });
};

let updateChungChi = async(req, res) => {
    uploadCertificate(req, res, async function(err) {
        if (err) {
            return res.send('Lỗi khi tải lên file: ' + err);
        }
        
        try {
            let data = req.body;
            let id = data.id;
            let thuyenvien_id = data.id_thuyenvien;
            
            // If file was uploaded, add file path to data
            if (req.file) {
                // Get existing record to check if there's an old file to delete
                const existingRecord = await ThuyenVienServices.getChungChiById(id);
                if (existingRecord && existingRecord.file) {
                    const oldFilePath = path.join(__dirname, '../public', existingRecord.file);
                    // Delete old file if it exists
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
                
                // Store relative path for database
                data.file = '/uploads/crew_certificates/' + req.file.filename;
            }
            
            await ThuyenVienServices.updateChungChi(id, data);
            
            return res.redirect('/thuyen-vien/' + thuyenvien_id);
        } catch (error) {
            res.send('Lỗi: ' + error.message);
        }
    });
};

let deleteChungChi = async(req, res) => {
    try {
        let id = req.params.id;
        let thuyenvien_id = req.params.thuyenvien_id;
        
        // Get the record to find the file path
        const record = await ThuyenVienServices.getChungChiById(id);
        
        // Delete the file if it exists
        if (record && record.file) {
            const filePath = path.join(__dirname, '../public', record.file);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        
        await ThuyenVienServices.deleteChungChi(id);
        
        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

module.exports = {
    getAllThuyenVien: getAllThuyenVien,
    postThuyenVien: postThuyenVien,
    getEditThuyenVien: getEditThuyenVien,
    putThuyenVien: putThuyenVien,
    deleteThuyenVien: deleteThuyenVien,
    getThuyenVienById: getThuyenVienById,
    updateThanNhan: updateThanNhan,
    updateLichSuDiTau: updateLichSuDiTau,
    createLichSuDiTau: createLichSuDiTau,
    createHocVan: createHocVan,
    updateHocVan: updateHocVan,
    deleteHocVan: deleteHocVan,
    createNgoaiNgu: createNgoaiNgu,
    updateNgoaiNgu: updateNgoaiNgu,
    deleteNgoaiNgu: deleteNgoaiNgu,
    createChungChi: createChungChi,
    updateChungChi: updateChungChi,
    deleteChungChi: deleteChungChi
}
