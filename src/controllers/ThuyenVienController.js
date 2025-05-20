import db from '../models';
import ThuyenVienServices from "../services/ThuyenVienServices";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const { Document, Packer, Paragraph, TextRun, AlignmentType} = require('docx');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/uploads/language_certificates');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, 'lang_cert_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
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
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/uploads/crew_certificates');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, 'crew_cert_' + Date.now() + path.extname(file.originalname));
    }
});

const uploadCertificate = multer({
    storage: certificateStorage,
    fileFilter: function (req, file, cb) {
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

// Configure multer for document file uploads
const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determine the correct destination based on file type
        let uploadFolder;
        const fieldname = file.fieldname;

        switch (fieldname) {
            case 'cccd_mattruoc':
            case 'cccd_matsau':
                uploadFolder = 'id_cards';
                break;
            case 'phieutiemvacxin':
                uploadFolder = 'vaccination';
                break;
            case 'chungnhanvangda':
                uploadFolder = 'yellow_fever';
                break;
            default:
                uploadFolder = 'other_documents';
        }

        const uploadPath = path.join(__dirname, `../public/uploads/documents/${uploadFolder}`);
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const fieldname = file.fieldname;
        cb(null, `${fieldname}_${req.params.id}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadDocuments = multer({
    storage: documentStorage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File upload only supports the following filetypes - ' + filetypes);
        }
    }
}).fields([
    { name: 'cccd_mattruoc', maxCount: 1 },
    { name: 'cccd_matsau', maxCount: 1 },
    { name: 'phieutiemvacxin', maxCount: 1 },
    { name: 'chungnhanvangda', maxCount: 1 }
]);

// Configure multer for crew member photo upload
const crewPhotoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/uploads/crew_photos');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, 'crew_photo_' + Date.now() + path.extname(file.originalname));
    }
});

const uploadCrewPhoto = multer({
    storage: crewPhotoStorage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File upload only supports the following filetypes - ' + filetypes);
        }
    }
}).single('crew_photo');

// Configure multer for multiple file uploads in the add new crew member form
const newCrewStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadFolder;

        // Determine the correct destination based on field name
        if (file.fieldname === 'crew_photo') {
            uploadFolder = 'crew_photos';
        } else if (file.fieldname.startsWith('certificate_file')) {
            uploadFolder = 'language_certificates';
        } else if (file.fieldname.startsWith('crew_certificate_file')) {
            uploadFolder = 'crew_certificates';
        } else if (file.fieldname === 'cccd_mattruoc' || file.fieldname === 'cccd_matsau') {
            uploadFolder = 'documents/id_cards';
        } else if (file.fieldname === 'phieutiemvacxin') {
            uploadFolder = 'documents/vaccination';
        } else if (file.fieldname === 'chungnhanvangda') {
            uploadFolder = 'documents/yellow_fever';
        } else {
            uploadFolder = 'documents/other_documents';
        }

        const uploadPath = path.join(__dirname, `../public/uploads/${uploadFolder}`);
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const prefix =
            file.fieldname === 'crew_photo' ? 'crew_photo_' :
                file.fieldname.startsWith('certificate_file') ? 'lang_cert_' :
                    file.fieldname.startsWith('crew_certificate_file') ? 'crew_cert_' :
                        file.fieldname;

        cb(null, `${prefix}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadNewCrewFiles = multer({
    storage: newCrewStorage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File upload only supports the following filetypes - ' + filetypes);
        }
    }
}).fields([
    { name: 'crew_photo', maxCount: 1 },
    { name: 'certificate_file[]', maxCount: 10 },
    { name: 'crew_certificate_file[]', maxCount: 10 },
    { name: 'cccd_mattruoc', maxCount: 1 },
    { name: 'cccd_matsau', maxCount: 1 },
    { name: 'phieutiemvacxin', maxCount: 1 },
    { name: 'chungnhanvangda', maxCount: 1 }
]);

let getAllThuyenVien = async (req, res) => {
    let data = await ThuyenVienServices.getAllThuyenVien();
    return res.render('danhsach_thuyenvien.ejs', {
        allThuyenVien: data
    });
};

let postThuyenVien = async (req, res) => {
    let message = await ThuyenVienServices.createNewThuyenVien(req.body);
    res.redirect('/danh-sach-thuyen-vien');
}

let getEditThuyenVien = async (req, res) => {
    let ThuyenVien_id = req.query.id;
    if (ThuyenVien_id) {
        let ThuyenVien_data = await ThuyenVienServices.getThuyenVienId(ThuyenVien_id);
        console.log(ThuyenVien_data);
        return res.send('Tìm thấy thuyền viên');
    } else {
        return res.send('Không tìm thấy thuyền viên');
    }
}

let putThuyenVien = async (req, res) => {
    try {
        let data = req.body;
        await ThuyenVienServices.updateThuyenVienData(req.params.id, data);
        return res.redirect('/danh-sach-thuyen-vien');
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let updateThanNhan = async (req, res) => {
    try {
        let data = req.body;
        let thuyenvien_id = req.params.id;
        await ThuyenVienServices.updateThanNhanData(thuyenvien_id, data);
        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
}

let updateLichSuDiTau = async (req, res) => {
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

let createLichSuDiTau = async (req, res) => {
    try {
        let data = req.body;
        let thuyenvien_id = data.thuyenvien_id;

        await ThuyenVienServices.createLichSuDiTau(data);

        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let createHocVan = async (req, res) => {
    try {
        let data = req.body;
        await ThuyenVienServices.createHocVan(data);
        return res.redirect('/thuyen-vien/' + data.id_thuyenvien);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let updateHocVan = async (req, res) => {
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

let deleteHocVan = async (req, res) => {
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
    if (thuyenvien_id) {
        let thuyenvien_data = await ThuyenVienServices.getThuyenVienId(thuyenvien_id);
        let nhanthanthuyenvien_data = await ThuyenVienServices.getNhanThanThuyenVien(thuyenvien_id);
        let lichsuditau_data = await ThuyenVienServices.getLichSuDiTau(thuyenvien_id);
        let chucvu_data = await ThuyenVienServices.getAllChucVu();
        let tau_data = await ThuyenVienServices.getAllTau();
        let hocvan_data = await ThuyenVienServices.getHocVanThuyenVien(thuyenvien_id);
        let ngoaingu_data = await ThuyenVienServices.getNgoaiNguThuyenVien(thuyenvien_id);
        let chungchi_data = await ThuyenVienServices.getChungChiThuyenVien(thuyenvien_id);
        let tailieu_data = await ThuyenVienServices.getTaiLieuThuyenVien(thuyenvien_id);

        return res.render('thuyenvien_chitiet.ejs', {
            thuyenvieninfo: thuyenvien_data,
            nhanthanthuyenvieninfo: nhanthanthuyenvien_data,
            lichsuditauinfo: lichsuditau_data,
            chucvuinfo: chucvu_data,
            tauinfo: tau_data,
            hocvaninfo: hocvan_data,
            ngoainguinfo: ngoaingu_data,
            chungchiinfo: chungchi_data,
            tailieuinfo: tailieu_data
        });
    }
    else {
        return res.send('Không tìm thấy thuyền viên');
    }
}

let createNgoaiNgu = async (req, res) => {
    upload(req, res, async function (err) {
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

let updateNgoaiNgu = async (req, res) => {
    upload(req, res, async function (err) {
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

let deleteNgoaiNgu = async (req, res) => {
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

let createChungChi = async (req, res) => {
    uploadCertificate(req, res, async function (err) {
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

let updateChungChi = async (req, res) => {
    uploadCertificate(req, res, async function (err) {
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

let deleteChungChi = async (req, res) => {
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

let uploadTaiLieu = async (req, res) => {
    uploadDocuments(req, res, async function (err) {
        if (err) {
            return res.send('Lỗi khi tải lên file: ' + err);
        }

        try {
            const thuyenvien_id = req.params.id;
            let data = {};

            // Process each uploaded file and add to data object
            if (req.files) {
                if (req.files.cccd_mattruoc) {
                    data.cccd_mattruoc = '/uploads/documents/id_cards/' + req.files.cccd_mattruoc[0].filename;
                }

                if (req.files.cccd_matsau) {
                    data.cccd_matsau = '/uploads/documents/id_cards/' + req.files.cccd_matsau[0].filename;
                }

                if (req.files.phieutiemvacxin) {
                    data.phieutiemvacxin = '/uploads/documents/vaccination/' + req.files.phieutiemvacxin[0].filename;
                }

                if (req.files.chungnhanvangda) {
                    data.chungnhanvangda = '/uploads/documents/yellow_fever/' + req.files.chungnhanvangda[0].filename;
                }
            }

            // Check if we have any files to update
            if (Object.keys(data).length > 0) {
                // Get existing record to check if there are old files to delete
                const existingRecord = await ThuyenVienServices.getTaiLieuThuyenVien(thuyenvien_id);

                if (existingRecord) {
                    // Delete old files if they are being replaced
                    for (const field in data) {
                        if (existingRecord[field]) {
                            const oldFilePath = path.join(__dirname, '../public', existingRecord[field]);
                            // Delete old file if it exists
                            if (fs.existsSync(oldFilePath)) {
                                fs.unlinkSync(oldFilePath);
                            }
                        }
                    }
                }

                await ThuyenVienServices.createOrUpdateTaiLieu(thuyenvien_id, data);
            }

            return res.redirect('/thuyen-vien/' + thuyenvien_id);
        } catch (error) {
            res.send('Lỗi: ' + error.message);
        }
    });
};

let deleteTaiLieuFile = async (req, res) => {
    try {
        const thuyenvien_id = req.params.id;
        const fieldName = req.params.field;

        // Get the existing record
        const record = await ThuyenVienServices.getTaiLieuThuyenVien(thuyenvien_id);

        if (!record || !record[fieldName]) {
            return res.send('Không tìm thấy tài liệu');
        }

        // Delete the file
        const filePath = path.join(__dirname, '../public', record[fieldName]);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Update the database record
        let updateData = {};
        updateData[fieldName] = null;
        await ThuyenVienServices.createOrUpdateTaiLieu(thuyenvien_id, updateData);

        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        res.send('Lỗi: ' + error.message);
    }
};

let getExpiringCertificates = async (req, res) => {
    try {
        // Get the days parameter from query, default to 90 days if not provided
        const days = req.query.days ? parseInt(req.query.days) : 90;

        // Get only professional certificates
        const expiringCertificates = await ThuyenVienServices.getExpiringCertificates(days);

        // Calculate days remaining for each certificate
        const processedCertificates = expiringCertificates.map(cert => {
            const today = new Date();
            const expiryDate = new Date(cert.ngayhethan);
            const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

            return {
                ...cert.toJSON(),
                daysRemaining
            };
        });

        // Sort by days remaining
        processedCertificates.sort((a, b) => a.daysRemaining - b.daysRemaining);

        return res.render('chungchi_saphethan.ejs', {
            certificates: processedCertificates,
            dayRange: days
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error: ' + error.message);
    }
};

let getExpiredCertificates = async (req, res) => {
    try {
        // Get only professional certificates
        const expiredCertificates = await ThuyenVienServices.getExpiredCertificates();

        // Calculate days overdue for each certificate
        const processedCertificates = expiredCertificates.map(cert => {
            const today = new Date();
            const expiryDate = new Date(cert.ngayhethan);
            const daysOverdue = Math.ceil((today - expiryDate) / (1000 * 60 * 60 * 24));

            return {
                ...cert.toJSON(),
                daysOverdue
            };
        });

        // Sort by days overdue (most overdue first)
        processedCertificates.sort((a, b) => b.daysOverdue - a.daysOverdue);

        return res.render('chungchi_hethan.ejs', {
            certificates: processedCertificates
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error: ' + error.message);
    }
};

// Render the add new crew member form
let getAddThuyenVienForm = async (req, res) => {
    try {
        // Get necessary data for dropdowns
        let chucvu_data = await ThuyenVienServices.getAllChucVu();
        let tau_data = await ThuyenVienServices.getAllTau();
        let chungchi_data = await ThuyenVienServices.getAllChungChi();

        return res.render('thuyenvien_themmoi.ejs', {
            chucvuinfo: chucvu_data,
            tauinfo: tau_data,
            chungchiinfo: chungchi_data
        });
    } catch (error) {
        console.error('Error loading form data:', error);
        return res.status(500).send('Server error: ' + error.message);
    }
};

// Process the new crew member form submission
let createNewThuyenVien = async (req, res) => {
    uploadNewCrewFiles(req, res, async function (err) {
        if (err) {
            return res.status(400).send('Error uploading files: ' + err);
        }

        try {
            // Extract basic crew info from request body
            const crewData = {
                hoten: req.body.hoten,
                ngaysinh: req.body.ngaysinh,
                cccd: req.body.cccd,
                chieucao: req.body.chieucao,
                cannang: req.body.cannang,
                nhommau: req.body.nhommau,
                sizegiay: req.body.sizegiay,
                sizegiaybaoho: req.body.sizegiaybaoho,
                email: req.body.email,
                sodienthoai: req.body.sodienthoai,
                tinhtranghonnhan: req.body.tinhtranghonnhan
            };

            // Add crew photo path if uploaded
            if (req.files && req.files.crew_photo) {
                crewData.photo = '/uploads/crew_photos/' + req.files.crew_photo[0].filename;
            }

            // Prepare family info
            const familyData = {
                hotenbo: req.body.hotenbo,
                sdtbo: req.body.sdtbo,
                hotenme: req.body.hotenme,
                sdtme: req.body.sdtme,
                hotenvo: req.body.hotenvo,
                sdtvo: req.body.sdtvo,
                nguoigiamho: req.body.nguoigiamho,
                sdtgiamho: req.body.sdtgiamho,
                diachi: req.body.diachi
            };

            // Prepare education info
            const educationData = {
                truongdaotao: req.body.truongdaotao,
                hedaotao: req.body.hedaotao,
                namtotnghiep: req.body.namtotnghiep
            };

            // Prepare language certificates
            let languageCertificates = [];

            if (Array.isArray(req.body['ngonngu'])) {
                for (let i = 0; i < req.body['ngonngu'].length; i++) {
                    const certData = {
                        ngonngu: req.body['ngonngu'][i],
                        tenchungchi: req.body['tenchungchi_nn'][i],
                        diemso: req.body['diemso'][i],
                        ngaycap: req.body['ngaycap_nn'][i] || null,
                        ngayhethan: req.body['ngayhethan_nn'][i] || null
                    };

                    // Add file path if available
                    if (req.files && req.files['certificate_file[]'] && req.files['certificate_file[]'][i]) {
                        certData.file = '/uploads/language_certificates/' + req.files['certificate_file[]'][i].filename;
                    }

                    languageCertificates.push(certData);
                }
            } else if (req.body['ngonngu']) {
                // Handle single language certificate
                const certData = {
                    ngonngu: req.body['ngonngu'],
                    tenchungchi: req.body['tenchungchi_nn'],
                    diemso: req.body['diemso'],
                    ngaycap: req.body['ngaycap_nn'] || null,
                    ngayhethan: req.body['ngayhethan_nn'] || null
                };

                // Add file path if available
                if (req.files && req.files['certificate_file[]']) {
                    certData.file = '/uploads/language_certificates/' + req.files['certificate_file[]'][0].filename;
                }

                languageCertificates.push(certData);
            }

            // Prepare crew certificates
            let crewCertificates = [];
            if (Array.isArray(req.body['tenchungchi_tv'])) {
                for (let i = 0; i < req.body['tenchungchi_tv'].length; i++) {
                    const certData = {
                        tenchungchi: req.body['tenchungchi_tv'][i],
                        sohieuchungchi: req.body['sohieuchungchi'][i],
                        ngaycap: req.body['ngaycap_tv'][i] || null,
                        ngayhethan: req.body['ngayhethan_tv'][i] || null,
                        noicap: req.body['noicap'][i],
                        xeploai: req.body['xeploai'][i]
                    };

                    // Add file path if available
                    if (req.files && req.files['crew_certificate_file[]'] && req.files['crew_certificate_file[]'][i]) {
                        certData.file = '/uploads/crew_certificates/' + req.files['crew_certificate_file[]'][i].filename;
                    }

                    crewCertificates.push(certData);
                }
            } else if (req.body['tenchungchi_tv']) {
                // Handle single crew certificate
                const certData = {
                    tenchungchi: req.body['tenchungchi_tv'],
                    sohieuchungchi: req.body['sohieuchungchi'],
                    ngaycap: req.body['ngaycap_tv'] || null,
                    ngayhethan: req.body['ngayhethan_tv'] || null,
                    noicap: req.body['noicap'],
                    xeploai: req.body['xeploai']
                };

                // Add file path if available
                if (req.files && req.files['crew_certificate_file[]']) {
                    certData.file = '/uploads/crew_certificates/' + req.files['crew_certificate_file[]'][0].filename;
                }

                crewCertificates.push(certData);
            }

            // Prepare document attachments
            const documentData = {};

            if (req.files) {
                if (req.files.cccd_mattruoc) {
                    documentData.cccd_mattruoc = '/uploads/documents/id_cards/' + req.files.cccd_mattruoc[0].filename;
                }

                if (req.files.cccd_matsau) {
                    documentData.cccd_matsau = '/uploads/documents/id_cards/' + req.files.cccd_matsau[0].filename;
                }

                if (req.files.phieutiemvacxin) {
                    documentData.phieutiemvacxin = '/uploads/documents/vaccination/' + req.files.phieutiemvacxin[0].filename;
                }

                if (req.files.chungnhanvangda) {
                    documentData.chungnhanvangda = '/uploads/documents/yellow_fever/' + req.files.chungnhanvangda[0].filename;
                }
            }

            // Submit all data to service
            const result = await ThuyenVienServices.createNewThuyenVienFull(
                crewData,
                familyData,
                educationData,
                languageCertificates,
                crewCertificates,
                documentData
            );

            // Redirect to the crew list page after successful creation
            return res.redirect('/danh-sach-thuyen-vien');
        } catch (error) {
            console.error('Error creating crew member:', error);
            return res.status(500).send('Server error: ' + error.message);
        }
    });
};

let updateThuyenVienStatus = async (req, res) => {
    try {
        const thuyenvien_id = req.params.id;
        const status = req.body.trangthai; // Assuming status is sent in the request body

        await ThuyenVienServices.updateThuyenVienStatus(thuyenvien_id, status);

        return res.redirect('/thuyen-vien/' + thuyenvien_id);
    } catch (error) {
        console.error('Error updating status:', error);
        return res.status(500).send('Server error: ' + error.message);
    }
}

let uploadThuyenVienPhoto = async (req, res) => {
    uploadCrewPhoto(req, res, async function (err) {
        if (err) {
            return res.status(400).send('Error uploading photo: ' + err);
        }

        try {
            const thuyenvien_id = req.params.id;

            // If file was uploaded, update the database with the file path
            if (req.file) {
                // Get existing record to check if there's an old photo to delete
                const existingRecord = await ThuyenVienServices.getThuyenVienId(thuyenvien_id);

                if (existingRecord && existingRecord.anh) {
                    const oldFilePath = path.join(__dirname, '../public', existingRecord.anh);
                    // Delete old file if it exists
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }

                // Store relative path for database
                const photoPath = '/uploads/crew_photos/' + req.file.filename;

                // Update the thuyenvien record with the new photo path
                await ThuyenVienServices.updateThuyenVienData(thuyenvien_id, { anh: photoPath });

                return res.redirect('/thuyen-vien/' + thuyenvien_id);
            } else {
                return res.status(400).send('No file was uploaded');
            }
        } catch (error) {
            console.error('Error updating photo:', error);
            return res.status(500).send('Server error: ' + error.message);
        }
    });
};

let exportThuyenvienContract = async (req, res) => {
    try {
        const id = req.params.id; // ví dụ đường dẫn /thuyenvien/export-word/:id

        const thuyenvien = await ThuyenVienServices.getThuyenvienById(id);

        if (!thuyenvien) {
            return res.status(404).send("Không tìm thấy thuyền viên");
        }

        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                                bold: true,
                                allCaps: true,
                                size: 28,
                                font: "Times New Roman",
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Độc lập - Tự do - Hạnh phúc",
                                italics: true,
                                size: 24,
                                font: "Times New Roman",
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 300 },
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "HỢP ĐỒNG ĐƯA NGƯỜI LAO ĐỘNG ĐI LÀM VIỆC Ở NƯỚC NGOÀI",
                                bold: true,
                                allCaps: true,
                                size: 28,
                                font: "Times New Roman",
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: "Số: ....",
                        size: 24,
                        font: "Times New Roman",
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 },
                    }),

                    new Paragraph({
                        text: "Hôm nay, ngày ... tháng ... năm ..., tại trụ sở Công ty TNHH Đầu tư và Phát triển nguồn nhân lực PITSCO chúng tôi gồm:",
                        size: 24,
                        font: "Times New Roman",
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: "Doanh nghiệp đưa người lao động đi làm việc ở nước ngoài: Công ty TNHH Đầu tư và Phát triển nguồn nhân lực PITSCO (sau đây gọi là Bên đưa đi)",
                        size: 24,
                        font: "Times New Roman",
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: "Địa chỉ trụ sở chính: Số 256 Lê Lợi, phường Lê Lợi, quận Ngô Quyền, Hải Phòng.",
                        size: 24,
                        font: "Times New Roman",
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: "Địa điểm kinh doanh: Số 196 Quán Trữ, phường Lãm Hà, quận Kiến An, Hải Phòng",
                        size: 24,
                        font: "Times New Roman",
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: "Điện thoại: 0225.2227.326; Email: contact@pitsco.vn; Địa chỉ trang thông tin điện tử: http://pitsco.vn",
                        size: 24,
                        font: "Times New Roman",
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: "Người đại diện công ty: Ông Bùi Ngọc Tấn",
                        size: 24,
                        font: "Times New Roman",
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: "Chức vụ: Tổng Giám đốc",
                        size: 24,
                        font: "Times New Roman",
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: "và",
                        size: 24,
                        font: "Times New Roman",
                        spacing: { after: 200 },
                    }),

                    new Paragraph({
                        text: `Họ tên: ${thuyenvien.hoten}`,
                        spacing: { after: 200 },
                        font: "Times New Roman",
                    }),
                    new Paragraph({
                        text: `CCCD: ${thuyenvien.cccd}`,
                        spacing: { after: 200 },
                        font: "Times New Roman",
                    }),
                    new Paragraph({
                        text: `Email: ${thuyenvien.email}`,
                        spacing: { after: 200 },
                        font: "Times New Roman",
                    }),
                    new Paragraph({
                        text: `Số điện thoại: ${thuyenvien.sodienthoai}`,
                        spacing: { after: 200 },
                        font: "Times New Roman",
                    }),

                ]
            }]
        });

        const buffer = await Packer.toBuffer(doc);

        res.setHeader("Content-Disposition", `attachment; filename=hopdong_thuyenvien_${id}.docx`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi xuất hợp đồng");
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
    deleteChungChi: deleteChungChi,
    uploadTaiLieu: uploadTaiLieu,
    deleteTaiLieuFile: deleteTaiLieuFile,
    getExpiringCertificates: getExpiringCertificates,
    getExpiredCertificates: getExpiredCertificates,
    getAddThuyenVienForm: getAddThuyenVienForm,
    createNewThuyenVien: createNewThuyenVien,
    updateThuyenVienStatus: updateThuyenVienStatus,
    uploadThuyenVienPhoto: uploadThuyenVienPhoto,
    exportThuyenvienContract: exportThuyenvienContract,

}
