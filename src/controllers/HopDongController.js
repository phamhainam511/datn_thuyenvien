import HopDongServices from "../services/HopDongServices.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/uploads/contract');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        cb(null, 'cons_' + Date.now() + path.extname(file.originalname));
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
            cb('Lỗi: Chỉ hỗ trợ tải lên các loại file sau đây - ' + filetypes);
        }
    }
}).single('hinhanh');

let getAllHopDong = async (req, res) => {
    try {
        let data = await HopDongServices.getAllHopDong();
        return res.render('danhsach_hopdong.ejs', {
            dataTable: data
        });
    } catch (err) {
        console.error("Lỗi khi lấy danh sách hợp đồng:", err);
        return res.status(500).send("Lỗi máy chủ. Không thể lấy dữ liệu hợp đồng.");
    }
};

let getHopDongChoThanhLy = async (req, res) => {
    let data = await HopDongServices.getHopDongChoThanhLy();
    return res.render('hopdong_chothanhly.ejs', {
        dataTable: data
    });
};

let getHopDongDaThanhLy = async (req, res) => {
    let data = await HopDongServices.getHopDongDaThanhLy();
    return res.render('hopdong_dathanhly.ejs', {
        dataTable: data
    });
}
let postHopDong = (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            console.log('Lỗi multer:', err);
            return res.send('Lỗi khi tải lên file: ' + err);
        }

        try {
            let data = req.body;
            console.log('Dữ liệu body:', data);
            console.log('File upload:', req.file);

            if (req.file) {
                data.hinhanh = '/uploads/contract/' + req.file.filename;
            }

            await HopDongServices.createNewHopDong(data);

            res.redirect('/danh-sach-hop-dong?success=true');
        } catch (error) {
            console.error('Lỗi khi tạo hợp đồng:', error);
            const errorMessage = error.message || 'Đã xảy ra lỗi không xác định!';
            res.redirect('/danh-sach-hop-dong?success=false&message=' + encodeURIComponent(errorMessage));
        }
    });
};

let getHopDongById = async (req, res) => {
    let hopdong_id = req.params.id;
    if (hopdong_id) {
        try {
            let hopdong_data = await HopDongServices.getHopDongById(hopdong_id);

            return res.render('hopdong_chitiet.ejs', {
                hopdonginfo: hopdong_data
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Lỗi server khi lấy thông tin hợp đồng');
        }
    } else {
        return res.status(400).send('Không tìm thấy ID hợp đồng');
    }
};


let puteditHopDong = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            console.error('Lỗi multer:', err);
            return res.send('Lỗi khi tải lên file: ' + err);
        }

        try {
            let data = req.body;
            let file = req.file;

            if (file) {
                const existingContract = await HopDongServices.getHopDongById(data.idHopDong);

                if (existingContract && existingContract.hinhanh) {
                    const oldFilePath = path.join(__dirname, '../public', existingContract.hinhanh);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }

                data.hinhanh = '/uploads/contract/' + file.filename;
            }

            await HopDongServices.updateHopDongData(data);

            return res.redirect('/danh-sach-hop-dong?updated=true');
        } catch (error) {
            console.error('Lỗi khi update:', error);
            const errorMessage = error.message || 'Đã xảy ra lỗi không xác định!';
            res.redirect('/danh-sach-hop-dong?updated=false&message=' + encodeURIComponent(errorMessage));
        }
    });
};



let deleteHopDong = async (req, res) => {
    let ids = req.body.id;
    if (!Array.isArray(ids)) {
        ids = [ids];
    }

    try {
        for (let id of ids) {
            await HopDongServices.deleteHopDong(id);
        }
        return res.status(200).json({ message: 'Xoá thành công.' });
    } catch (error) {
        console.error('Lỗi xoá hợp đồng:', error);
        return res.status(500).json({ message: 'Xoá thất bại, vui lòng thử lại.' });
    }
};



let postThanhLyHopDong = async (req, res) => {
    try {
        const message = await HopDongServices.updatethanhLyHopDong(req.body.idHopDong);
        return res.status(200).json({ message });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Lỗi server khi thanh lý hợp đồng' });
    }
}

let datHieuLuc = async (req, res) => {
    try {
        const { idHopDong } = req.body;
        if (!idHopDong) {
            return res.status(400).json({ message: 'Thiếu ID hợp đồng.' });
        }

        await HopDongServices.updateTrangThai(idHopDong, 'Có hiệu lực');

        return res.json({ message: 'Trạng thái hợp đồng đã được cập nhật thành "Có hiệu lực".' });
    } catch (error) {
        console.error('Lỗi datHieuLuc:', error);
        return res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái.' });
    }
};

module.exports = {
    getAllHopDong: getAllHopDong,
    postHopDong: postHopDong,
    puteditHopDong: puteditHopDong,
    deleteHopDong : deleteHopDong,
    getHopDongChoThanhLy : getHopDongChoThanhLy,
    postThanhLyHopDong : postThanhLyHopDong,
    getHopDongDaThanhLy : getHopDongDaThanhLy,
    getHopDongById : getHopDongById,
    datHieuLuc : datHieuLuc,
}