CREATE TABLE `phanquyen` (
  `id_phanquyen` int NOT NULL AUTO_INCREMENT,
  `tenphanquyen` varchar(30) NOT NULL,
  `mota` varchar(45) NOT NULL,
  PRIMARY KEY (`id_phanquyen`)
);

CREATE TABLE `trangthai` (
  `id_trangthai` int NOT NULL AUTO_INCREMENT,
  `tentrangthai` varchar(45) NOT NULL,
  PRIMARY KEY (`id_trangthai`)
);

CREATE TABLE `loaitau` (
  `id_loaitau` int NOT NULL AUTO_INCREMENT,
  `tenloaitau` varchar(30) NOT NULL,
  PRIMARY KEY (`id_loaitau`)
);

CREATE TABLE `chucvu` (
  `id_chucvu` int NOT NULL AUTO_INCREMENT,
  `tenchucvu` varchar(30) NOT NULL,
  PRIMARY KEY (`id_chucvu`),
  UNIQUE KEY `tenchucvu_UNIQUE` (`tenchucvu`)
);

CREATE TABLE `chungchi` (
  `id_chungchi` int NOT NULL AUTO_INCREMENT,
  `tenchungchi` varchar(45) NOT NULL,
  `tieuchuanapdung` varchar(45) NOT NULL,
  PRIMARY KEY (`id_chungchi`),
  UNIQUE KEY `tenchungchi_UNIQUE` (`tenchungchi`)
);

CREATE TABLE `hopdong` (
  `id_hopdong` int NOT NULL AUTO_INCREMENT,
  `tenhopdong` varchar(45) NOT NULL,
  PRIMARY KEY (`id_hopdong`)
);

CREATE TABLE `user` (
  `taikhoan` varchar(30) NOT NULL,
  `matkhau` varchar(30) NOT NULL,
  `phanquyen_id` int NOT NULL,
  PRIMARY KEY (`taikhoan`),
  KEY `user_phanquyen_idx` (`phanquyen_id`),
  CONSTRAINT `user_phanquyen` FOREIGN KEY (`phanquyen_id`) REFERENCES `phanquyen` (`id_phanquyen`)
);

CREATE TABLE `thuyenvien` (
  `id_thuyenvien` int NOT NULL AUTO_INCREMENT,
  `anh` varchar(100) NOT NULL,
  `hoten` varchar(45) NOT NULL,
  `cccd` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `sodienthoai` varchar(45) NOT NULL,
  `chieucao` int NOT NULL,
  `cannang` float NOT NULL,
  `nhommau` varchar(5) NOT NULL,
  `sizegiay` int NOT NULL,
  `tinhtranghonnhan` varchar(20) NOT NULL,
  PRIMARY KEY (`id_thuyenvien`)
);

CREATE TABLE `tau` (
  `id_tau` int NOT NULL AUTO_INCREMENT,
  `tentau` varchar(45) NOT NULL,
  `quoctich` varchar(30) NOT NULL,
  `loaitau_id` int NOT NULL,
  PRIMARY KEY (`id_tau`),
  KEY `tau_loaitau_idx` (`loaitau_id`),
  CONSTRAINT `tau_loaitau` FOREIGN KEY (`loaitau_id`) REFERENCES `loaitau` (`id_loaitau`)
);

CREATE TABLE `bangluong` (
  `id_bangluong` int NOT NULL AUTO_INCREMENT,
  `thuyenvien_id` int NOT NULL,
  `luongcb` decimal(10,0) NOT NULL,
  `tigia` decimal(10,0) NOT NULL,
  `socong` int NOT NULL,
  `thoigian` date NOT NULL,
  `tongtien` decimal(10,0) NOT NULL,
  `phuongthuc` varchar(45) NOT NULL,
  `tinhtrang` varchar(45) NOT NULL,
  PRIMARY KEY (`id_bangluong`),
  KEY `thuyenvien_bangluong_idx` (`thuyenvien_id`),
  CONSTRAINT `bangluong_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
);

CREATE TABLE `thannhan` (
  `id_thannhan` int NOT NULL,
  `thuyenvien_id` int NOT NULL,
  `hotenbo` varchar(45) DEFAULT NULL,
  `sdtbo` varchar(11) DEFAULT NULL,
  `hotenme` varchar(45) DEFAULT NULL,
  `sdtme` varchar(11) DEFAULT NULL,
  `hotenvo` varchar(45) DEFAULT NULL,
  `sdtvo` varchar(11) DEFAULT NULL,
  `nguoigiamho` varchar(45) DEFAULT NULL,
  `sdtgiamho` varchar(11) DEFAULT NULL,
  `diachi` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_thannhan`),
  KEY `thannhan_thuyenvien_idx` (`thuyenvien_id`),
  CONSTRAINT `thannhan_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
);

CREATE TABLE `taikhoannganhang` (
  `thuyenvien_id` int NOT NULL,
  `stk` varchar(15) NOT NULL,
  `tentaikhoan` varchar(45) NOT NULL,
  `tennganhang` varchar(45) NOT NULL,
  PRIMARY KEY (`thuyenvien_id`),
  CONSTRAINT `nganhang_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
);

CREATE TABLE `lichsuditau` (
  `id_lichsuditau` int NOT NULL AUTO_INCREMENT,
  `thuyenvien_id` int NOT NULL,
  `chucvu_id` int NOT NULL,
  `tau_id` int NOT NULL,
  `timexuatcanh` datetime NOT NULL,
  `timelentau` datetime NOT NULL,
  `ngayroitau` date DEFAULT NULL,
  `cangroitau` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_lichsuditau`),
  KEY `thuyenvien_chuyentau_idx` (`thuyenvien_id`),
  KEY `chuyentau_chucvu_idx` (`chucvu_id`),
  KEY `lichsuditau_tau_idx` (`tau_id`),
  CONSTRAINT `lichsuditau_chucvu` FOREIGN KEY (`chucvu_id`) REFERENCES `chucvu` (`id_chucvu`),
  CONSTRAINT `lichsuditau_tau` FOREIGN KEY (`tau_id`) REFERENCES `tau` (`id_tau`),
  CONSTRAINT `lichsuditau_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
);

CREATE TABLE `thuyenvien_chungchi` (
  `id_thuyenvien_chungchi` int NOT NULL AUTO_INCREMENT,
  `thuyenvien_id` int NOT NULL,
  `chungchi_id` int NOT NULL,
  `sohieuchungchi` varchar(20) NOT NULL,
  `ngaycap` datetime NOT NULL,
  `ngayhethan` datetime NOT NULL,
  `noicap` varchar(100) NOT NULL,
  `hangbangcap` varchar(30) NOT NULL,
  PRIMARY KEY (`id_thuyenvien_chungchi`),
  KEY `chitiet_thuyenvien_chungchi_idx` (`thuyenvien_id`),
  KEY `chitiet_chungchi_idx` (`chungchi_id`),
  CONSTRAINT `tvcc_chungchi` FOREIGN KEY (`chungchi_id`) REFERENCES `chungchi` (`id_chungchi`),
  CONSTRAINT `tvcc_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
);

CREATE TABLE `thuyenvien_hopdong` (
  `id_thuyenvien_hopdong` int NOT NULL AUTO_INCREMENT,
  `thuyenvien_id` int NOT NULL,
  `hopdong_id` int NOT NULL,
  `ngayky` datetime NOT NULL,
  `ngayhethan` datetime NOT NULL,
  `trangthaihopdong` varchar(45) NOT NULL,
  `hinhanh` varchar(100) NOT NULL,
  PRIMARY KEY (`id_thuyenvien_hopdong`),
  KEY `chitiet_hopdong_thuyenvien_idx` (`thuyenvien_id`),
  KEY `chitiet_hopdong_idx` (`hopdong_id`),
  CONSTRAINT `tvhd_hopdong` FOREIGN KEY (`hopdong_id`) REFERENCES `hopdong` (`id_hopdong`),
  CONSTRAINT `tvhd_thuyenvien` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`)
);

CREATE TABLE `thuyenvien_trangthai` (
  `thuyenvien_id` int NOT NULL,
  `trangthai_id` int NOT NULL,
  `thoigian` date DEFAULT NULL,
  PRIMARY KEY (`thuyenvien_id`),
  KEY `chitiet_trangthai_idx` (`trangthai_id`),
  CONSTRAINT `tvtt_thuyenvieni` FOREIGN KEY (`thuyenvien_id`) REFERENCES `thuyenvien` (`id_thuyenvien`),
  CONSTRAINT `tvtt_trangthai` FOREIGN KEY (`trangthai_id`) REFERENCES `trangthai` (`id_trangthai`)
);

CREATE TABLE `chucvu_chungchi` (
  `id_chungchi_chucvu` int NOT NULL AUTO_INCREMENT,
  `chucvu_id` int NOT NULL,
  `chungchi_id` int NOT NULL,
  PRIMARY KEY (`id_chungchi_chucvu`),
  KEY `cvcc_chucvu_idx` (`chucvu_id`),
  KEY `cvcc_chungchi_idx` (`chungchi_id`),
  CONSTRAINT `cvcc_chucvu` FOREIGN KEY (`chucvu_id`) REFERENCES `chucvu` (`id_chucvu`),
  CONSTRAINT `cvcc_chungchi` FOREIGN KEY (`chungchi_id`) REFERENCES `chungchi` (`id_chungchi`)
);
